import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          À propos de Chat
        </h1>
        
        <div className="prose prose-lg text-gray-600">
          <p className="mb-4">
            Chat est une application de messagerie moderne et intuitive conçue pour faciliter 
            la communication entre utilisateurs.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Fonctionnalités
          </h2>
          
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Interface utilisateur moderne et responsive</li>
            <li>Messages en temps réel</li>
            <li>Sécurité et confidentialité</li>
            <li>Facile à utiliser</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Technologies
          </h2>
          
          <p className="mb-4">
            Cette application est construite avec les dernières technologies web pour 
            offrir une expérience utilisateur optimale.
          </p>
        </div>
      </div>
    </div>
  )
}