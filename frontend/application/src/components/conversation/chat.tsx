import { useEffect, useRef, useState } from "react";
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
  };

  // scroll to bottom when new messages are added
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <ul className="flex flex-col gap-5" ref={ref}>
        {
          messages.map((message: Message) => (
            <ChatMessage  
              key={message.id}
              message={message}
            />
          ))
        }
      </ul>
      <MessageInput onSubmit={handleSubmit} />
    </>
  )
}
