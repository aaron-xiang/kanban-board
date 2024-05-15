import mongoose from 'mongoose';
import Task from '@/models/task';
import Column from '@/components/Column';
import connectMongoDB from '@/libs/mongodb';
import getData from '@/data/initial-data';

export default async function seedData() {
  await connectMongoDB();

  const initialData = await getData();

  async function addInitialData() {
    try {
      const tasksArray = Object.values(initialData.tasks);
      // Loop through tasks and create Task instances
      for (const taskData of tasksArray) {
        const task = new Task(taskData);
        // Save each task to the database
        await task.save();
      }
      const columnsArray = Object.values(initialData.columns);
      // Loop through columns and create Column instances
      for (const columnData of columnsArray) {
        const column = new Column(columnData);
        // Save each column to the database
        await column.save();
      }
      console.log('Initial data added successfully.');
    } catch (error) {
      console.error('Error adding initial data:', error);
    } finally {
      // Disconnect from MongoDB after adding initial data
      mongoose.disconnect();
    }
  }

  addInitialData();
}