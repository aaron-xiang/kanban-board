'use client';

// import styled from 'styled-components';
import { useEffect, useState } from 'react';
import getTasks from '@/data/initial-data';
import Column from './Column';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
// import seedData from '@/data/seedscript';

export default function Home() {
  resetServerContext();
  // seedData();
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await getTasks();
        setState(initialData);
      } catch (error) {
        console.log('Error fetching tasks: ', error);
      }
    };
    fetchData();
  }, []);

  const onDragEnd = (result) => {
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
