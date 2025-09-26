import { useEffect, useState } from "react";
import type { User } from "../hooks/useGetMe"
import { Chat } from "./chat";

type Props = {
    me: User;
    user: User;
    onReturn: () => void;
}

export type Message = {
    id: number;
    content: string;
    created_at: string;
    sender_id: number;
    receiver_id: number;
};

export const Conversation = ({
    me,
    user,
    onReturn
}: Props) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages?first_user_id=${me.id}&second_user_id=${user.id}`);
                const data = await response.json();
                setMessages(data.messages);
                if (conversationId === null) {
                    setConversationId(data.conversation_id);
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchMessages();
    }, []);

    return (
        <div className="h-full py-12">
            <div className="flex gap-12">
                <button className="bg-blue-500 px-6 text-white hover:bg-blue-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" onClick={onReturn}>Retour</button>
                <h1 className="text-2xl font-medium text-center">{user.username}</h1>
            </div>
            {
                isLoading ? (
                    <div className="flex flex-col gap-6">
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                    </div>
                ) : (
                    conversationId && (
                        <Chat me={me} user={user} initialMessages={messages} conversationId={conversationId} />
                    )
                )
            }
        </div>
    )
}
