import connectMongoDB from '@/libs/mongodb';
import Column from '@/models/column';
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
  console.log('Received data: ', { taskId });

  await connectMongoDB();

  const deletedTask = await Task.findOneAndDelete({ taskId: taskId });
  if (!deletedTask) {
    return new Response(JSON.stringify({ message: 'Task not found' }), { status: 404 });
  } 

  const updatedColumn = await Column.findOneAndUpdate(
    { taskIds: taskId },
    { $pull: { taskIds: taskId } },
    { new: true }
  );
  if (!updatedColumn) {
    return new Response(JSON.stringify({ message: 'Column not found or taskId not in any column' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Task and task reference deleted' }), { status: 200 });
}
