import { useEffect, useState } from "react";
import type { User } from "./useGetMe";

export const useGetUsers = (): {
    users: User[];
    isLoading: boolean;
} => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/users');
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
  };
}
