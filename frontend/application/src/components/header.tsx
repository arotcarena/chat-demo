import { Link, useNavigate } from "@tanstack/react-router"

export const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        navigate({ to: '/login' })
    }

    return (
        <header>
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold text-gray-900">
                        Chat
                    </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                    <Link 
                        to="/" 
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        activeProps={{ className: "bg-gray-100 text-gray-900" }}
                    >
                        Accueil
                    </Link>
                    <Link 
                        to="/about" 
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        activeProps={{ className: "bg-gray-100 text-gray-900" }}
                    >
                        À propos
                    </Link>
                    <button 
                        className="bg-red-500 px-6 text-white hover:bg-red-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" 
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </button>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}
