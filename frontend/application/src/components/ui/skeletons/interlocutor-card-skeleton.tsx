import { UserCircleIcon } from "lucide-react"
import { Card, CardContent } from "../card"
import { Skeleton } from "../skeleton"

export const InterlocutorCardSkeleton = () => {
    return (
        <Card className="w-38 sm:w-42 hover:shadow-md group transition-all duration-300 animate-pulse">
            <CardContent className="flex flex-col items-center gap-2">
                <UserCircleIcon className="size-10 text-rose-300 group-hover:scale-116 transition-all duration-300" />
                <Skeleton className="h-4 mt-2 w-[120px]" />
            </CardContent>
        </Card>
    )
}
