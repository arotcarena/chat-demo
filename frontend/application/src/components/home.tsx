import { getUsers } from "../apiQueries/userQueries";
import { useAuthMe } from "../jotai/atoms";
import { Link } from "@tanstack/react-router";
import type { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCountUnreadByInterlocutor } from "../apiQueries/messageQueries";
import { InterlocutorCard } from "./ui/interlocutor-card";
import { useEffect, useState } from "react";
import { socket } from "../main";
import { Footer } from "./footer";
import { PageContainer } from "./ui/page-container";
import { PageHeader } from "./ui/page-header";
import { PageTitle } from "./ui/page-title";
import { PageContent } from "./ui/page-content";
import { InterlocutorCardSkeleton } from "./ui/skeleton/interlocutor-card-skeleton";

export const Home = () => {
  const me = useAuthMe();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData: [],
  });

  // affichage du nombre de messages non lus par interlocuteur
  const [countUnreadByInterlocutor, setCountUnreadByInterlocutor] = useState<{[interlocutorId: number]: number}>({});
  useQuery({
    queryKey: ['countUnreadByInterlocutor', me.id],
    queryFn: async () => {
      const responseData = await getCountUnreadByInterlocutor(me.id);
      setCountUnreadByInterlocutor(responseData);
      return responseData;
    },
    initialData: null,
  });

  useEffect(() => {
    socket.on('unread_receiver_' + me.id, (interlocutorId: number) => {
      setCountUnreadByInterlocutor((countUnreadByInterlocutor: {[interlocutorId: number]: number}) => ({
        ...countUnreadByInterlocutor,
        [interlocutorId]: (countUnreadByInterlocutor[interlocutorId] || 0) + 1,
      }));
    });

    return () => {
      socket.off('unread_receiver_' + me.id);
    };
  }, []);

  return (
    <PageContainer>
      <PageHeader className="text-center mb-8 lg:mb-12">
        <PageTitle>Bienvenue, {me.username} !</PageTitle>
        <h2 className="text-2xl font-medium mt-4 lg:mt-6">Avec qui voulez-vous parler ?</h2>
      </PageHeader>
      <PageContent>
        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
          {
            isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <InterlocutorCardSkeleton key={index} />
              ))
            ) : (
              users.map((user: User) => (
                user.id !== me.id && (
                  <Link
                    key={user.id}
                    to={`/conversation/${user.username}` as string}
                  >
                      <InterlocutorCard
                        interlocutor={user}
                        countUnread={countUnreadByInterlocutor?.[user.id] || 0}
                      />
                  </Link>
                )
              ))
            )
          }
        </div>
      </PageContent>
      <Footer />
    </PageContainer>
  )
}
