import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../../components/home'

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
})

function HomePage() {
  return <Home />
}
