import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
    className?: string
}>;

export const PageHeader = ({ children, className }: Props) => {
    return (
        <div className={cn('flex-none my-6', className)}>
            {children}
        </div>
    )
}
