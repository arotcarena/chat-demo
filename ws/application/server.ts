import express from 'express';
import type { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// routes
import userRoutes from './routes/users.ts';
import authRoutes from './routes/auth.ts';
import messageRoutes from './routes/messages.ts';
import { prisma } from './prisma/prisma-client.ts';

type Message = {
  id: number;
  content: string;
  created_at?: string;
  sender_id: number;
  receiver_id: number;
}

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
app.use('/api/messages', messageRoutes);

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
  socket.on('submit_message', async (message: Message, conversationId: number) => {
    try {
      // Créer le message en base de données
      const createdMessage = await prisma.message.create({
        data: {
          content: message.content,
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
          conversation_id: conversationId,
          created_at: new Date().toISOString(),
        }
      });

      // Émettre le message avec l'ID généré par la base de données
      io.emit('message_' + conversationId, createdMessage);
    } catch (error) {
      console.error('Erreur lors de la création du message:', error);
      socket.emit('message_error', { error: 'Failed to save message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ client déconnecté :', socket.id);
  });
});

// Démarrer
httpServer.listen(3000, '0.0.0.0', () => {
  console.log("✅ Socket.IO écoute sur ws://0.0.0.0:3000");
});
