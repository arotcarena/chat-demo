import { useNavigate } from "@tanstack/react-router"
import { useGetMe } from "../hooks/useGetMe"
import { useEffect, type PropsWithChildren } from "react"

export const AuthWrapper = ({
    children,
}: PropsWithChildren) => {
    const me = useGetMe()
    const navigate = useNavigate()

    useEffect(() => {
      if (me === false) {
          navigate({ to: '/login' })
      }
    }, [me, navigate])

    if (!me) {
      return null
    }

    return children
}
