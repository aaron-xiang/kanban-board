'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getData from '@/data/getData';
import Column from './Column';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const AddColumnButton = styled.button`
  margin: 16px;
  padding: 8px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Home() {
  resetServerContext();
  const [state, setState] = useState(null);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await getData();
        setState(initialData);
      } catch (error) {
        console.log('Error fetching tasks: ', error);
      }
    };
    fetchData();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newState = { ...state };
    const column = newState.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    newState.columns = {
      ...newState.columns,
      [newColumn.columnId]: newColumn,
    };

    setState(newState);

    // Make an API call to update the taskIds list in the backend
    try {
      const response = await fetch('/api/columns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          columnId: newColumn.columnId,
          taskIds: newTaskIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update column in the backend');
      }

      const data = await response.json();
      console.log('Backend update successful:', data);
    } catch (error) {
      console.error('Error updating column in the backend:', error);
    }
  };

  const addColumn = () => {
    if (!newColumnTitle) return;

    const newColumnId = `column-${Date.now()}`;
    const newColumn = {
      columnId: newColumnId,
      title: newColumnTitle,
      taskIds: [],
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...state.columnOrder, newColumnId],
    };

    setState(newState);
    setNewColumnTitle('');

    // Optionally, you can make an API call to save the new column to the backend
  };

  return state !== null ? (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnsContainer>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <Column key={column.columnId} column={column} tasks={tasks} />;
          })}
        </ColumnsContainer>
      </DragDropContext>
      <div>
        <input
          type="text"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="New Column Title"
          className="border border-slate-500 px-8 py-2 text-black"
        />
        <AddColumnButton onClick={addColumn}>Add Column</AddColumnButton>
      </div>
    </div>
  ) : null;
}
