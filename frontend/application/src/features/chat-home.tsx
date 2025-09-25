import { useState } from "react";
import type { User } from "../hooks/useGetMe";
import { useGetUsers } from "../hooks/useGetUsers";
import { Conversation } from "./conversation";

type Props = {
  me: User;
}

export const ChatHome = ({
  me
}: Props) => {
  const [page, setPage] = useState<'home' | 'conversation'>('home');

  const { users, isLoading } = useGetUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleSelectUser = (user: User) => {
    setPage('conversation');
    setSelectedUser(user);
  };

  const handleReturn = () => {
    setPage('home');
    setSelectedUser(null);
  };

  if (page === 'conversation' && selectedUser) {
    return (
      <Conversation me={me} user={selectedUser} onReturn={handleReturn} />
    )
  }

  return (
    <>
        <h1 className="my-6 text-2xl font-medium">Choisissez un utilisateur pour commencer une conversation</h1>
        {
            isLoading ? (
                <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse">to do : skeleton</div>
            ) : (
                users.map((user) => (
                    <div key={user.id} className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-md cursor-pointer" onClick={() => handleSelectUser(user)}>
                        {user.username}
                    </div>
                ))
            )
        }
    </>
  )
}
