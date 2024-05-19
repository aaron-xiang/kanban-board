import connectMongoDB from '@/libs/mongodb';
import Column from '@/models/column';
import Task from '@/models/task';

export async function POST(request) {
  const { columnId, taskId, content } = await request.json();
  console.log('Received data:', { columnId, taskId, content });

  await connectMongoDB();

  // create new task
  await Task.create({ taskId, content });

  // update corresponding column
  const updatedColumn = await Column.findOneAndUpdate(
    { columnId: columnId },
    { $push: { taskIds: taskId } },
    { new: true }
  );

  if (!updatedColumn) {
    return new Response(JSON.stringify({ message: 'Column not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Task Created and added to column' }), { status: 201 });
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
