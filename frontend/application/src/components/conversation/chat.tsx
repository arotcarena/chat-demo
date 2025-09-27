import { useEffect, useRef, useState } from "react";
import { socket } from '../../main'
import { useAuthMe } from "../../jotai/atoms";
import type { Message, User } from "../../types";

type Props = {
  interlocutor: User;
  initialMessages: Message[];
  conversationId: number;
}

export const Chat = ({
  interlocutor,
  initialMessages,
  conversationId,
}: Props) => {
  const me = useAuthMe();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    for (const initMessage of initialMessages) {
      if (initMessage.status === 'unread' && initMessage.sender_id !== me.id) {
        socket.emit('mark_as_read', initMessage.id);
      }
    }
  }, [initialMessages]);

  useEffect(() => {
    // Logs de connexion
    socket.on('connect', () => {
      console.log('✅ Connecté au serveur Socket.IO');
    });

    socket.on('message_' + conversationId, (message) => {
      setMessages(messages => [...messages, message]);
      if (message.sender_id !== me.id) {
        socket.emit('mark_as_read', message.id);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('message_' + conversationId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('submit_message', {
      content: inputMessage,
      sender_id: me.id,
      receiver_id: interlocutor.id,
      conversation_id: conversationId,
    }, conversationId);
    setInputMessage('');
  };

  // scroll to bottom when new messages are added
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <ul className="mt-5 px-12 flex flex-col gap-6 overflow-y-auto" ref={ref}>
        {
          messages.map((message: Message) => (
            <li
              key={message.id}
              className={'px-4 py-3 rounded-md w-60' + (message.sender_id === me.id ? ' self-end' : ' self-start') + (message.sender_id === me.id ? ' bg-blue-500 text-white' : ' bg-green-500')}
            >
              <div>{message.content}</div>
              <div>{new Date(message.created_at).toLocaleString()}</div>
            </li>
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
  )
}
