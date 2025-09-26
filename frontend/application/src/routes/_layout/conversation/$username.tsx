import { createFileRoute } from '@tanstack/react-router'
import { Conversation } from '../../../components/conversation';

export const Route = createFileRoute('/_layout/conversation/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams();
  
  return <Conversation interlocutorUsername={username} />
}
