import type { User } from "../hooks/useGetMe";
import { useGetUsers } from "../hooks/useGetUsers";
import { useAuthMe } from "../jotai/atoms";
import { useNavigate } from "@tanstack/react-router";

export const Home = () => {
  const me = useAuthMe();
  const navigate = useNavigate();

  const { users, isLoading } = useGetUsers();

  const handleSelectUser = (user: User) => {
    navigate({ to: `/conversation/${user.username}` });
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue, {me.username}!</h1>
        </div>
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
      </div>
    </div>
  )
}
