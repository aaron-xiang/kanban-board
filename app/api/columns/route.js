import connectMongoDB from '@/libs/mongodb';
import Column from '@/models/column'; 

export async function POST(request) {
  const { columnId, taskIds } = await request.json();
  console.log('Received data:', { columnId, taskIds });

  await connectMongoDB();

  const updatedColumn = await Column.findOneAndUpdate(
    { columnId: columnId },
    { taskIds: taskIds },
    { new: true }
  );

  if (!updatedColumn) {
    return new Response(JSON.stringify({ message: 'Column not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Column updated successfully' }), { status: 200 });
}
