import EditTaskForm from '@/components/EditTaskForm';

export default async function EditTask({ params }) {
  const { taskId } = params;

  return <EditTaskForm taskId={taskId} />;
}
