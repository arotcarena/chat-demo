import { useNavigate } from "@tanstack/react-router"
import { type PropsWithChildren } from "react"
import { useAtom } from "jotai";
import { meAtom } from "../jotai/atoms";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../apiQueries/authQueries";

export const AuthWrapper = ({
    children,
}: PropsWithChildren) => {
  const navigate = useNavigate()
  const [me, setMe] = useAtom(meAtom);

  useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const response = await getMe();
        setMe({
          id: response.userId,
          username: response.username
        });
        return response;
      } catch (e) {
        setMe(false);
        navigate({ to: '/login' });
      }
    },
    initialData: null,
  });

  if (!me) {
    return null
  }

  return children
}
