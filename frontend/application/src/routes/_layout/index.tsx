import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChatHome } from '../../components/chat-home'
import { useEffect } from 'react'
import { useGetMe } from '../../hooks/useGetMe'

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
})

function HomePage() {
  const me = useGetMe()
  const navigate = useNavigate()

  useEffect(() => {
    if (me === false) {
        navigate({ to: '/login' })
    }
  }, [me, navigate])

  if (!me) {
    return null
  }

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue, {me.username}!</h1>
        </div>
        <ChatHome me={me} />
      </div>
    </div>
  )
}
