import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '../auth/signup'

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  return <SignUp />
}
