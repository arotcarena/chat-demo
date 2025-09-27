import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
    className?: string
}>;

export const PageTitle = ({ children, className }: Props) => {
    return (
        <h1 className={cn('text-2xl lg:text-4xl xl:text-5xl font-bold', className)}>
            {children}
        </h1>
    )
}
