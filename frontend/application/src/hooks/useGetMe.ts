import { useEffect, useState } from "react";

export type User = {
    id: number;
    username: string;
}

export const useGetMe = () => {
  const [me, setMe] = useState<User | null>(null);

  const fetchMe = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      }
    });
    if (response.status === 401) {
      return;
    }
    const data = await response.json();
    setMe({
      id: data.userId,
      username: data.username
    });
  }

  useEffect(() => {
    fetchMe();
  }, []);

  return me;
}
