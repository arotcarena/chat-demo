import { Chat } from "./chat";
import { Link } from "@tanstack/react-router";
import { useAuthMe } from "../../jotai/atoms";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../../apiQueries/userQueries";
import { getMessages } from "../../apiQueries/messageQueries";

type Props = {
    interlocutorUsername: string;
}

export const Conversation = ({
    interlocutorUsername,
}: Props) => {
    const me = useAuthMe();

    // on récupère l'interlocuteur
    const { data: interlocutor, isLoading: isLoadingInterlocutor } = useQuery({
        queryKey: ['user', interlocutorUsername],
        queryFn: () => getUserByUsername(interlocutorUsername),
    });

    // puis les messages de la conversation liée à l'interlocuteur
    const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
        queryKey: ['messages', me.id, interlocutor?.id],
        queryFn: () => getMessages(me.id, interlocutor!.id),
        enabled: !!interlocutor,
    });

    const messages = messagesData?.messages || [];
    const conversationId = messagesData?.conversation_id || null;
    const isLoading = isLoadingInterlocutor || isLoadingMessages;

    return (
        <div className="h-full flex flex-col">
            <div className="flex-none flex gap-12 py-6">
                <Link className="bg-blue-500 px-6 text-white hover:bg-blue-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" to="/">Retour</Link>
                <h1 className="text-2xl font-medium text-center">{interlocutorUsername}</h1>
            </div>
            {
                isLoading || !interlocutor ? (
                    <div className="flex flex-col h-full gap-6">
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
