import { useEffect, useState } from "react";
import { Chat } from "./chat";
import { Link } from "@tanstack/react-router";
import type { User } from "../../hooks/useGetMe";
import { useAuthMe } from "../../jotai/atoms";

type Props = {
    interlocutorUsername: string;
}

export type Message = {
    id: number;
    content: string;
    created_at: string;
    sender_id: number;
    receiver_id: number;
};

export const Conversation = ({
    interlocutorUsername,
}: Props) => {
    const me = useAuthMe();

    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [interlocutor, setInterlocutor] = useState<User | null>(null);

    useEffect(() => {
        const fetchInfos = async () => {
            setIsLoading(true);
            try {
                const interlocutorResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${interlocutorUsername}`);
                const interlocutorData = await interlocutorResponse.json();
                setInterlocutor(interlocutorData);

                const messagesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/messages?first_user_id=${me.id}&second_user_id=${interlocutorData.id}`);
                const messagesData = await messagesResponse.json();
                setMessages(messagesData.messages);
                if (conversationId === null) {
                    setConversationId(messagesData.conversation_id);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInfos();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="h-full py-12">
            <div className="flex gap-12">
                <Link className="bg-blue-500 px-6 text-white hover:bg-blue-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" to="/">Retour</Link>
                <h1 className="text-2xl font-medium text-center">{interlocutor?.username}</h1>
            </div>
            {
                isLoading || !interlocutor ? (
                    <div className="flex flex-col gap-6">
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                        <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse h-8" />
                    </div>
                ) : (
                    conversationId && (
                        <Chat interlocutor={interlocutor} initialMessages={messages} conversationId={conversationId} />
                    )
                )
            }
        </div>
    )
}
