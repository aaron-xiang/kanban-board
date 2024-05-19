import EditTaskForm from '@/components/EditTaskForm';

const getTaskById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch task');
    }

    const data = await res.json();
    if (!data.task) {
      throw new Error('Task not found');
    }

    return data;
  } catch (error) {
    console.log(error);
    return { task: null };
  }
};

export default async function EditTask({ params }) {
  const { id } = params;
  const { task } = await getTaskById(id);
  const { taskId, content } = task;

  return <EditTaskForm id={id} taskId={taskId} content={content} />;
}
