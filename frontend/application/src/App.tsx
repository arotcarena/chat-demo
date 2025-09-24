import { Login } from "./auth/login";
import { Chat } from "./features/chat";
import { useGetMe } from "./hooks/useGetMe"

function App() {
  const me = useGetMe();

  if (me) {
    return <Chat />
  }

  return <Login />
}

export default App
