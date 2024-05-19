import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';
import Column from '@/models/column';

export default async function handler(req, res) {
  await connectMongoDB();

  try {
    const tasks = await Task.find({});
    const columns = await Column.find({});

    // convert mongoose documents to plain objects
    
    const tasksObj = {};
    tasks.forEach(task => {
      tasksObj[task.taskId] = task.toObject();
    });

    const columnsObj = {};
    columns.forEach(column => {
      columnsObj[column.columnId] = column.toObject();
    });

    const columnOrder = columns.map(column => column.columnId);

    const initialData = {
      tasks: tasksObj,
      columns: columnsObj,
      columnOrder,
    };

    res.status(200).json(initialData);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
}