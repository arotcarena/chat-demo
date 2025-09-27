import { Link, useNavigate } from "@tanstack/react-router"
import { useAtomValue } from "jotai";
import { meAtom } from "../jotai/atoms";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { LogOutIcon, User2Icon, UserCircle2Icon, UserCircleIcon, UserIcon } from "lucide-react";

export const Header = ({ className }: { className?: string }) => {
    const me = useAtomValue(meAtom);
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        navigate({ to: '/login' })
    }

    return (
        <header className={cn(
            'bg-white border-b border-gray-50 shadow-xs shadow-gray-100',
            className
        )}>
            <nav>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-rose-500 font-bold text-2xl ">
                        Chat
                    </Link>
                    <div className="flex items-center space-x-4">
                    {me && (
                        <>
                            <div className="flex items-center gap-2">
                                <UserCircleIcon className="size-7 text-rose-500" />
                                <span className="font-bold text-sm text-rose-500">{me.username}</span>
                            </div>
                            <Button
                                variant="secondary"
                                onClick={handleLogout}
                                className="cursor-pointer sm:ms-4"
                            >
                                <LogOutIcon className="size-4" />
                                <span className="hidden sm:block">Déconnexion</span>
                            </Button>
                        </>
                    )}
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}
