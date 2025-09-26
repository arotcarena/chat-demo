import { useEffect, useState } from "react";

export type User = {
    id: number;
    username: string;
}

export const useGetMe = () => {
  const [me, setMe] = useState<User | null | false>(null);

  const fetchMe = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      if (response.status === 401) {
        setMe(false);
        return;
      }
      const data = await response.json();
      setMe({
        id: data.userId,
        username: data.username
      });
    } catch (e) {
      setMe(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return me;
}
