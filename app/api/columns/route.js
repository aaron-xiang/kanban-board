import connectMongoDB from '@/libs/mongodb';
import Column from '@/models/column'; 

export async function POST(request) {
  const { columnId, columnTitle, taskIds } = await request.json();
  console.log('Received data:', { columnId, columnTitle, taskIds });

  await connectMongoDB();

  await Column.create({ columnId, columnTitle, taskIds });

  const updatedColumn = await Column.findOneAndUpdate(
    { columnId: columnId },
    { title: columnTitle },
    { taskIds: taskIds },
    { new: true }
  );

  if (!updatedColumn) {
    return new Response(JSON.stringify({ message: 'Column not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Column updated successfully' }), { status: 200 });
}

export async function GET() {

}

export async function DELETE(request) {

}