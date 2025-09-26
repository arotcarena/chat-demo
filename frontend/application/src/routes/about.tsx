import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">À propos</h1>
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          Cette application de chat est construite avec React et TanStack Router.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Technologies utilisées :</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>React 19</li>
          <li>TanStack Router</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Socket.IO</li>
        </ul>
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <p className="text-blue-800">
            <strong>Note :</strong> Cette page est un exemple de route avec TanStack Router.
            Vous pouvez naviguer entre les pages en utilisant la navigation en haut.
          </p>
        </div>
      </div>
    </div>
  )
}
