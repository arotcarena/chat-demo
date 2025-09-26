import { Outlet } from '@tanstack/react-router'
import { Header } from './header'
import { AuthWrapper } from './auth-wrapper'

export const Layout = () => {
  return (
    <AuthWrapper>
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    </AuthWrapper>
  )
}
