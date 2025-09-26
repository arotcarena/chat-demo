import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {io} from 'socket.io-client'
import React from 'react';

export const socket = io('http://localhost:3000', { 
  path: '/socket.io',
  transports: ['websocket'],
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
