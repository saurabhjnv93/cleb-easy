import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Package from '../models/Package.js';
import User from '../models/User.js';

dotenv.config();

const packages = [
  { name: 'Basic Party', description: 'Balloon decoration, lighting, welcome board.', startingPrice: 2999, features: ['Balloons', 'Base lighting', 'Welcome board'], theme: 'Classic', cityAvailability: ['Mumbai','Delhi','Bangalore'] },
  { name: 'Premium Party', description: 'Theme decoration, cake, photography, music setup.', startingPrice: 6999, features: ['Theme décor','Cake','Photography','Music'], theme: 'Premium', cityAvailability: ['Mumbai','Delhi','Bangalore','Hyderabad'] },
  { name: 'Luxury Party', description: 'Full customized setup, live effects, premium photography.', startingPrice: 14999, features: ['Custom décor','Live entertainment','Surprise effects'], theme: 'Luxury', cityAvailability: ['Mumbai','Delhi'] }
];

const users = [
  { name: 'Admin', email: 'admin@celebeasy.com', password: 'Admin123!', role: 'admin' }
];

const seed = async () => {
  await connectDB();
  await Package.deleteMany();
  await User.deleteMany();
  await Package.create(packages);
  await User.create(users);
  console.log('Seed complete');
  process.exit();
};

seed();
