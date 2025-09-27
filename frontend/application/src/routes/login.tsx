import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../auth/login'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return <Login />
}
