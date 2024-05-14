import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';

export async function POST(request) {
  const { id, content } = await request.json();
  await connectMongoDB();
  await Task.create({ id, content });
  return Response.json({ message: 'Task Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const tasks = await Task.find();
  return Response.json({ tasks });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Task.findByIdAndDelete(id);
  return Response.json({ message: 'Task deleted' }, { status: 200 });
}