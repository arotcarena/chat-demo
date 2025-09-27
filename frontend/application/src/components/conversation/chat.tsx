import { useEffect, useState, useRef } from "react";
import { socket } from '../../main'
import { useAuthMe } from "../../jotai/atoms";
import type { Message, User } from "../../types";
import { MessageInput } from "../ui/message-input";
import { ChatMessage } from "../ui/chat-message";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    for (const initMessage of initialMessages) {
      if (initMessage.status === 'unread' && initMessage.sender_id !== me.id) {
        socket.emit('mark_as_read', initMessage.id);
      }
    }
  }, [initialMessages]);

  useEffect(() => {
    socket.on('message_' + conversationId, (message) => {
      setMessages(messages => [...messages, message]);
      if (message.sender_id !== me.id) {
        socket.emit('mark_as_read', message.id);
      }
      // Scroll to bottom when a new message arrives
      setTimeout(scrollToBottom, 100);
    });

    return () => {
      socket.off('message_' + conversationId);
    };
  }, []);

  const handleSubmit = (value: string) => {
    socket.emit('submit_message', {
      content: value,
      sender_id: me.id,
      receiver_id: interlocutor.id,
      conversation_id: conversationId,
    }, conversationId);
    // Scroll to bottom when sending a message
    setTimeout(scrollToBottom, 100);
  };

  return (
    <>
      <ul className="flex flex-col gap-5">
        {
          messages.map((message: Message) => (
            <ChatMessage  
              key={message.id}
              message={message}
            />
          ))
        }
        <div ref={messagesEndRef} />
      </ul>
      <MessageInput onSubmit={handleSubmit} />
    </>
  )
}
