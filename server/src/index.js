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
app.get('/health', (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Connect MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
