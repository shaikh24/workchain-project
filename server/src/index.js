import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import jobsRoutes from './routes/jobs.js';
import paymentsRoutes from './routes/payments.js';
import reviewsRoutes from './routes/reviews.js';
import chatRoutes from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: process.env.CORS_ORIGIN || '*' } });
app.set('io', io);

io.on('connection', (socket) => {
  socket.on('join', (room) => socket.join(room));
  socket.on('message', ({ room, message }) => io.to(room).emit('message', message));
});

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// API Routes
app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/chat', chatRoutes);

// Serve client
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));
app.get('*', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));

const PORT = process.env.PORT || 4000;

async function start() {
  if (!process.env.JWT_SECRET) {
    console.error('Missing JWT_SECRET');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'workchain' });
    console.log('✅ MongoDB connected');
  } catch (e) {
    console.error('❌ MongoDB connection failed:', e.message);
  }
  server.listen(PORT, () => console.log(`🚀 Server running http://localhost:${PORT}`));
}
start();
