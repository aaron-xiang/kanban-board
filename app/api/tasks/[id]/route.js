import connectMongoDB from '../../../libs/mongodb';
import Task from '../../../models/task';

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Task.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: 'Task updated' }, { status: 200 });
}