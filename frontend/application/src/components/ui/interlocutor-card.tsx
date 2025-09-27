import { UserCircleIcon } from "lucide-react";
import type { User } from "../../types";
import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";

type Props = {
    interlocutor: User;
    countUnread: number;
};

export const InterlocutorCard = ({
    interlocutor,
    countUnread,
}: Props) => {
    return (
        <Card className="w-38 sm:w-42 hover:shadow-md group transition-all duration-300 relative">
            <div className={cn(
                'absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-rose-500 rounded-full size-9',
                'flex items-center justify-center text-lg text-white',
                'transition-all duration-300',
                countUnread > 0 ? 'opacity-100' : 'opacity-0',
            )}>{countUnread}</div>
            <CardContent className="flex flex-col items-center gap-2">
                <UserCircleIcon className="size-10 text-rose-500 group-hover:scale-116 transition-all duration-300" />
                <div className="text-lg font-medium group-hover:text-rose-500 transition-all duration-300">{interlocutor.username}</div>
            </CardContent>
        </Card>
    )
};
