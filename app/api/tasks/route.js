import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';

export async function POST(request) {
  const { taskId, content } = await request.json();
  console.log('Received data:', { taskId, content });
  await connectMongoDB();
  await Task.create({ taskId, content });
  return Response.json({ message: 'Task Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const tasks = await Task.find();
  return Response.json({ tasks });
}

export async function DELETE(request) {
  const taskId = request.nextUrl.searchParams.get('taskId');
  console.log('Received data: ', {taskId});
  await connectMongoDB();
  await Task.findOneAndDelete({ taskId: taskId });
  return Response.json({ message: 'Task deleted' }, { status: 200 });
}