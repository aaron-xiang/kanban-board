import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';

export async function PUT(request, { params }) {
  const { id } = params;
  const { newContent: content } = await request.json();
  await connectMongoDB();
  await Task.findByIdAndUpdate(id, { content });
  return Response.json({ message: 'Task updated' }, { status: 200 });
}

// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectMongoDB();
//   const topic = await Task.findOne({ taskId: id });
//   return NextResponse.json({ topic }, { status: 200 });
// }