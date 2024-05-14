import mongoose, { Schema } from 'mongoose';

const columnSchema = new Schema(
  {
    id: String,
    title: String,
    taskIds: [String]
  }
);

const Column = mongoose.models.Column || mongoose.model('Column', columnSchema);

export default Column;