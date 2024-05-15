'use client';

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';
// import { Link } from 'react-router-dom';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

function Card({ task, index }) {
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          {task.content}
          {/* <Link href={`/editTask/${task.id}`}>
            <HiPencilAlt />
          </Link> */}
          <div className='flex gap-2'>
            <HiPencilAlt />
            <RemoveBtn taskId={task.taskId}/>  
          </div>     
        </Container>
      )}
    </Draggable>
  );
}

export default Card;
