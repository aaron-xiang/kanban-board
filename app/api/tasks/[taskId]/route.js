import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';

export async function PUT(request, { params }) {
  const { taskId } = params;
  const { newContent: content } = await request.json();
  await connectMongoDB();
  await Task.findOneAndUpdate(
    {taskId: taskId},
    {content: content}
  );
  return Response.json({ message: 'Task updated' }, { status: 200 });
}

export async function GET(request, { params }) {
  const { taskId } = params;
  await connectMongoDB();
  const task = await Task.findOne({ taskId: taskId });
  return Response.json({ task }, { status: 200 });
}