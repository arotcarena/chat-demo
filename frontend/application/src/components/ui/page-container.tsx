import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
    className?: string
}>;

export const PageContainer = ({ children, className }: Props) => {
    return (
        <div className={cn("flex flex-col h-full px-4 sm:px-6 md:px-8 lg:max-w-[950px] lg:mx-auto", className)}>
            {children}
        </div>
    )
}
