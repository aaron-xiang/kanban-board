'use client';

import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';
import Link from 'next/link';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

function ColumnComponent({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.columnId}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Card key={task.taskId} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <Link 
        className="text-black bg-white p-2" 
        href={{ 
          pathname: '/addTask', 
          query: { columnId: column.columnId } 
        }}
      >
        Add Task
      </Link>
    </Container>
  );
};

export default ColumnComponent;
