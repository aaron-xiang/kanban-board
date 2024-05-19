import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';
import Column from '@/models/column';

const initialData = {
  tasks: {
    'task-1': { taskId: 'task-1', content: 'Take out the trash' },
    'task-2': { taskId: 'task-2', content: 'Watch favorite show' },
    'task-3': { taskId: 'task-3', content: 'Charge phone' },
    'task-4': { taskId: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      columnId: 'column-1',
      title: 'Todo',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },
  columnOrder: ['column-1'],
};

// export async function fetchTasks() {
//   try {
//     await connectMongoDB();
//     const tasks = await Task.find();
//     return Response.json({ tasks });
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     throw error; 
//   }
// }

// export async function fetchColumns() {
//   try {
//     await connectMongoDB();
//     const columns = await Column.find();
//     return Response.json({ columns });
//   } catch (error) {
//     console.error('Error fetching columns:', error);
//     throw error; 
//   }
// }

export default async function getData() {
  return initialData;
}
