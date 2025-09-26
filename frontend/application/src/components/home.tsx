import { getUsers } from "../apiQueries/userQueries";
import { useAuthMe } from "../jotai/atoms";
import { Link } from "@tanstack/react-router";
import type { User } from "../types";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const me = useAuthMe();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData: [],
  });

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue, {me.username} !</h1>
        </div>
        <h1 className="my-6 text-2xl font-medium">Choisissez un utilisateur pour commencer une conversation</h1>
        {
            isLoading ? (
                <div className="bg-gray-100 px-4 py-3 rounded-md animate-pulse">to do : skeleton</div>
            ) : (
                <div className="flex flex-col gap-2">
                  {
                    users.map((user: User) => (
                        <Link
                          key={user.id}
                          className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-md cursor-pointer block"
                          to={`/conversation/${user.username}` as string}
                        >
                            {user.username}
                        </Link>
                    ))
                  }
                </div>
            )
        }
      </div>
    </div>
  )
}
