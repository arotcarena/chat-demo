import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Login } from '../auth/login'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    setTimeout(() => {
      navigate({ to: '/' })
    }, 100)
  }

  return <Login onLoginSuccess={handleLoginSuccess} />
}
