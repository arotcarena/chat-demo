const http = require('http');
const { Server } = require('socket.io');

let messages = [];

// Serveur HTTP "nu"
const httpServer = http.createServer((req, res) => {
  console.log('🌐 Requête reçue:', req.method, req.url);
  console.log('📋 Headers:', req.headers);
  
  // Laisser Socket.IO gérer les requêtes
  if (req.url.startsWith('/socket.io/')) {
    // Socket.IO gérera cette requête
    return;
  }
  
  res.writeHead(404);
  res.end('Not Found');
});

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
  
  socket.on('submit_message', (message) => {
    messages.push(message);
    io.emit('message', message);
  });

  socket.on('clear_messages', () => {
    messages = []
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
