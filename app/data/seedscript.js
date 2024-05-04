const mongoose = require('mongoose');

// Define schema for tasks
const taskSchema = new mongoose.Schema({
  id: String,
  content: String,
});

// Define schema for columns
const columnSchema = new mongoose.Schema({
  id: String,
  title: String,
  taskIds: [String],
});

// Define schema for the overall data model
const dataSchema = new mongoose.Schema({
  tasks: [taskSchema],
  columns: [columnSchema],
  columnOrder: [String],
});

// Define model based on the data schema
const DataModel = mongoose.model('DataModel', dataSchema);

// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://aaronxiang:Eh4nS63DnK2Yhped@cluster0.tzcicmo.mongodb.net/';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Create initial data object
    const initialData = {
      tasks: {
        'task-1': { id: 'task-1', content: 'Take out the trash' },
        'task-2': { id: 'task-2', content: 'Watch favorite show' },
        'task-3': { id: 'task-3', content: 'Charge phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Todo',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
      },
      columnOrder: ['column-1'],
    };

    // Create new document with initial data and save to MongoDB
    const newData = new DataModel(initialData);
    newData.save()
      .then(() => {
        console.log('Data seeded successfully');
        // Close MongoDB connection
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error seeding data:', error);
        // Close MongoDB connection
        mongoose.connection.close();
      });

    // // Find documents
    // DataModel.find({})
    //   .then((data) => {
    //     console.log('Data found:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error finding data:', error);
    //   });

    // // Update a document
    // DataModel.findOneAndUpdate({ /* query */, { /* update */ }, { new: true })
    //   .then((updatedData) => {
    //     console.log('Data updated:', updatedData);
    //   })
    //   .catch((error) => {
    //     console.error('Error updating data:', error);
    //   });

    // // Delete a document
    // DataModel.findOneAndDelete({ /* query */ })
    //   .then(() => {
    //     console.log('Data deleted');
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting data:', error);
    //   });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
