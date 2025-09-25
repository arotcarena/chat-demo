import { Login } from "./auth/login";
import { ChatHome } from "./features/chat-home";
import { useGetMe } from "./hooks/useGetMe"

function App() {
  const me = useGetMe();
  
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  };

  if (me) {
    return (
      <>
        <header className="fixed top-0 inset-x-0 bg-white z-1000 h-[64px] border-b border-gray-300 flex items-center justify-center px-6">
          <h1 className="text-2xl font-medium">Chat</h1>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-6">
            <div>{me.username}</div>
            <button className="bg-red-500 px-6 text-white hover:bg-red-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </header>
        <div className="flex flex-col h-full pt-[64px] max-w-[800px] mx-auto gap-2">
          <ChatHome me={me} />
        </div>
      </>
    )
  }

  return <Login />
}

export default App
