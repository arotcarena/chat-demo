import { getUsers } from "../apiQueries/userQueries";
import { useAuthMe } from "../jotai/atoms";
import { Link } from "@tanstack/react-router";
import type { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCountUnreadByInterlocutor } from "../apiQueries/messageQueries";
import { InterlocutorCard } from "./ui/interlocutor-card";
import { useEffect, useState } from "react";
import { socket } from "../main";

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
    <div className="flex flex-col h-full gap-2">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue, {me.username} !</h1>
        </div>
        <h1 className="my-6 text-2xl font-medium">Avec qui voulez-vous parler ?</h1>
        {
            isLoading ? (
                <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse">to do : skeleton</div>
            ) : (
                <div className="flex flex-col gap-2">
                  {
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
                  }
                </div>
            )
        }
      </div>
    </div>
  )
}
