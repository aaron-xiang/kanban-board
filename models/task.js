import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    id: String,
    content: String,
  }
);

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;