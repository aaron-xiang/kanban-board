'use client';

import { HiOutlineTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function RemoveBtn({ taskId }) {
  const router = useRouter();

  const removeTask = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/?taskId=${taskId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          onRemove(taskId);
          router.refresh();
        } else {
          throw new Error('Failed to delete the task');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={removeTask} className='text-red-400'>
      <HiOutlineTrash size={24} />
    </button>
  );
}