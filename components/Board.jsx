'use client';

// import styled from 'styled-components';
import { useEffect, useState } from 'react';
import initialData from '../data/initial-data';
import Column from './Column';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
// import axios from 'axios';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

const getTasks = async () => {
  try {
    const res = await fetch('/api/tasks', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading tasks: ', error);
  }
};

export default function Home() {
  resetServerContext();
  const [state, setState] = useState(initialData);
 
  // const { tasks } = getTasks();
  // const newState = { ...state };
  // newState.tasks = tasks;
  // setState(newState);

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
      [newColumn.id]: newColumn,
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
