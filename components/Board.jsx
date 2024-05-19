'use client';

import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import getData from '@/data/initial-data';
import getData from '@/data/getData';
import Column from './Column';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';

export default function Home() {
  resetServerContext();
  const [state, setState] = useState(null);

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
    console.log(destination, source, draggableId);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

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
  
  return state !== null ? (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
        return <Column key={column.columnId} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  ) : null;
}