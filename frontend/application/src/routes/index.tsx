import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../auth/login'
import { ChatHome } from '../features/chat-home'
import { useGetMe } from '../hooks/useGetMe'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const me = useGetMe()
  
  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    window.location.reload()
  }

  if (me) {
    return (
      <div className="flex flex-col h-full gap-2">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Bienvenue, {me.username}!</h1>
            <button 
              className="bg-red-500 px-6 text-white hover:bg-red-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" 
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
          <ChatHome me={me} />
        </div>
      </div>
    )
  }

  return <Login />
}
