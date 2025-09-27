import { Link, useNavigate } from "@tanstack/react-router"
import { useAtomValue } from "jotai";
import { meAtom } from "../jotai/atoms";

export const Header = () => {
    const me = useAtomValue(meAtom);
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
                    {me && (
                        <>
                            <span className="font-bold">{me.username}</span>
                            <button 
                                className="bg-red-500 px-6 text-white hover:bg-red-600 transition-colors duration-300 rounded-md p-2 cursor-pointer" 
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </button>
                        </>
                    )}
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}
