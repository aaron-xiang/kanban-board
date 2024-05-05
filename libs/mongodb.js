const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(proncess.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;