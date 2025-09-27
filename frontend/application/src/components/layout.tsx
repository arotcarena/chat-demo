import { Outlet } from '@tanstack/react-router'
import { Header } from './header'
import { AuthWrapper } from './auth-wrapper'

export const Layout = () => {
  return (
    <AuthWrapper>
        <div className="h-screen flex flex-col overflow-hidden">
            <Header className="flex-none" />
            <main className="grow">
                <Outlet />
            </main>
        </div>
    </AuthWrapper>
  )
}
