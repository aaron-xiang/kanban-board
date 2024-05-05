import connectMongoDB from '../../../libs/mongodb';
import Task from '../../../models/task';

export async function POST(request) {
  const { id, content } = await request.json();
  await connectMongoDB();
  await Task.create({ id, content });
  return NextResponse.json({ message: 'Task Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const tasks = await Task.find();
  return NextResponse.json({ tasks });
}