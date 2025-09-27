import { Chat } from "./chat";
import { Link } from "@tanstack/react-router";
import { useAuthMe } from "../../jotai/atoms";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../../apiQueries/userQueries";
import { getMessages } from "../../apiQueries/messageQueries";
import { PageContainer } from "../ui/page-container";
import { PageHeader } from "../ui/page-header";
import { PageTitle } from "../ui/page-title";
import { PageContent } from "../ui/page-content";
import { ArrowLeftIcon, UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ChatMessageSkeleton } from "../ui/skeletons/chat-message-skeleton";

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
        <PageContainer>
            <div className="fixed inset-x-0 top-[84px] z-20 max-w-7xl mx-auto">
                <div className="flex">
                    <div className="flex items-center gap-6 p-2 pe-4 rounded-full backdrop-blur-sm">
                            <Button variant="secondary" className="rounded-full size-12 flex items-center justify-center relative">
                                <Link to="/" className="absolute inset-0" />
                                <ArrowLeftIcon className="size-8" />
                            </Button>
                        <div className="flex items-center gap-2 text-gray-800">
                            <UserCircleIcon className="size-12" />
                            <span className="text-2xl lg:text-3xl font-medium">{interlocutorUsername}</span>
                        </div>
                    </div>
                </div>
            </div>
            <PageContent className="pt-[100px] pb-[140px] w-full md:w-2xl mx-auto">
                {
                    isLoading || !interlocutor ? (
                        <div className="flex flex-col gap-5">
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <ChatMessageSkeleton
                                        key={index}
                                        position={index % 2 === 0 ? 'start' : 'end'}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        conversationId && (
                            <Chat interlocutor={interlocutor} initialMessages={messages} conversationId={conversationId} />
                        )
                    )
                }
            </PageContent>
        </PageContainer>
    )
}
