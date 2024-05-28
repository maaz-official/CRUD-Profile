import mongoose from 'mongoose';

const connectionString = process.env.MONGO_URL || 'mongodb+srv://profiles-creation:profiles-creation@cluster0.kxchrpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString)
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error('Error connecting to the database:', error.message));

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connected to the database');
});

db.on('error', (error) => {
  console.error(`Mongoose connection error: ${error.message}`);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from the database');
});

process.on('SIGINT', async () => {
  await db.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default mongoose;
