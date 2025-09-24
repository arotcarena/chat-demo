import { useEffect, useState } from "react";
import { socket } from '../main'

export const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    // Logs de connexion
    socket.on('connect', () => {
      console.log('✅ Connecté au serveur Socket.IO');
    });

    socket.on('message', (message) => {
      console.log('📨 Message reçu:', message);
      setMessages(messages => [...messages, message]);
    });

    socket.on('messages', (messages) => {
      console.log('📨 Messages reçus:', messages);
      setMessages(messages);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('messages');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('submit_message', inputMessage);
    setInputMessage('');
  };

  // scroll to bottom when new messages are added
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  const handleClear = () => {
    socket.emit('clear_messages');
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 bg-white z-1000 h-[64px] border-b border-gray-300 flex items-center justify-center px-6">
        <h1 className="text-2xl font-medium">Chat</h1>
        <button className="bg-red-500 px-6 text-white hover:bg-red-600 transition-colors duration-300 rounded-md p-2 absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleClear}>Effacer</button>
      </header>
      <div className="flex flex-col h-full pt-[64px] max-w-[800px] mx-auto">
        <ul className="mt-5 px-12 flex flex-col items-start gap-6 overflow-y-auto" ref={ref}>
          {
            messages.map((message) => (
              <li key={JSON.stringify(message)} className="bg-gray-100 px-4 py-3 rounded-md">{message}</li>
            ))
          }
        </ul>
        <div className="grow"></div>
        <div className="mt-auto flex-none p-3">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-1">
              <input className="grow h-12 border border-gray-300 rounded-md p-2" type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
              <button className="h-12 px-6 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300" type="submit">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
