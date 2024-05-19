'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTopic() {
  const [columnId, setColumnId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert('Please name your task');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ columnId, taskId, content }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to create a task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setColumnId(e.target.value)}
        value={columnId}
        className="border border-slate-500 px-8 py-2 text-black"
        type="text"
        placeholder="Column ID"
      />

      <input
        onChange={(e) => setTaskId(e.target.value)}
        value={taskId}
        className="border border-slate-500 px-8 py-2 text-black"
        type="text"
        placeholder="Task ID"
      />

      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="border border-slate-500 px-8 py-2 text-black"
        type="text"
        placeholder="Task name"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Create Task
      </button>
    </form>
  );
}
