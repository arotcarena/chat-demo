import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
    className?: string
}>;

export const PageContent = ({ children, className }: Props) => {
    return (
        <div className={cn('grow', className)}>
            {children}
        </div>
    )
}
