import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from 'socket.io';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import bookingRoutes from './src/routes/bookings.js';
import adminRoutes from './src/routes/admin.js';
import packageRoutes from './src/routes/packages.js';
import reviewRoutes from './src/routes/reviews.js';
import galleryRoutes from './src/routes/gallery.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import rateLimiter from './src/middleware/rateLimiter.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(rateLimiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'CelebEasy Backend' }));
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('join-room', (room) => {
    socket.join(room);
  });
  socket.on('booking:update', (data) => {
    io.to(data.userId).emit('booking:update', data);
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`CelebEasy API running on port ${PORT}`));
export { io };
