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

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { 
  cors: { origin: process.env.CORS_ORIGIN || "*" }
});

app.set('io', io);

// ✅ Socket.IO listeners
io.on('connection', (socket) => {
  console.log("New client connected:", socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('message', ({ room, message }) => {
    io.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// ✅ API Routes
app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Serve static frontend (agar client folder public hai)
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));
app.get('*', (req, res) =>
  res.sendFile(path.join(publicDir, 'index.html'))
);

const PORT = process.env.PORT || 4000;

// ✅ Start Server
async function start() {
  if (!process.env.JWT_SECRET) {
    console.error('❌ Missing JWT_SECRET in .env');
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error('❌ Missing MONGO_URI in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "workchain" });
    console.log('✅ MongoDB connected');

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

start();
