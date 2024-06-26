'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTopicForm({ taskId }) {
  const [newContent, setNewContent] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newContent }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="border border-slate-500 px-8 py-2 text-black"
        type="text"
        placeholder="New Task Content"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
