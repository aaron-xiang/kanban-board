'use client';

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';

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
          <div className="flex gap-2">
            <Link href={`/editTask/${task.taskId}`}>
              <HiPencilAlt />
            </Link>
            <RemoveBtn taskId={task.taskId} />
          </div>
        </Container>
      )}
    </Draggable>
  );
}

export default Card;
