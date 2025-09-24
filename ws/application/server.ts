import express from 'express';
import type { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// routes
import userRoutes from './routes/users.ts';
import authRoutes from './routes/auth.ts';

let messages: string[] = [];

// Application Express
const app = express();

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware pour parser JSON
app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});


// Serveur HTTP avec Express
const httpServer = createServer(app);

// Instance Socket.IO
const io = new Server(httpServer, {
  path: '/socket.io',
  cors: { 
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
  },
  allowEIO3: true,
  transports: ['polling', 'websocket']
});

// Gestion de la connexion WebSocket
io.on('connection', (socket) => {
  socket.emit('messages', messages);
  
  socket.on('submit_message', (message: string) => {
    messages.push(message);
    io.emit('message', message);
  });

  socket.on('clear_messages', () => {
    messages = [];
    io.emit('messages', []);
  });

  socket.on('disconnect', () => {
    console.log('❌ client déconnecté :', socket.id);
  });
});

// Démarrer
httpServer.listen(3000, '0.0.0.0', () => {
  console.log("✅ Socket.IO écoute sur ws://0.0.0.0:3000");
});
