import { UserCircleIcon } from "lucide-react";
import type { User } from "../../types";
import { Card, CardContent } from "./card";

type Props = {
    interlocutor: User;
    countUnread: number;
};

export const InterlocutorCard = ({
    interlocutor,
    countUnread,
}: Props) => {
    return (
        <Card className="w-38 sm:w-42 hover:shadow-md group transition-all duration-300">
            <CardContent className="flex flex-col items-center gap-2">
                <UserCircleIcon className="size-10 text-rose-500 group-hover:scale-116 transition-all duration-300" />
                <div className="text-lg font-medium group-hover:text-rose-500 transition-all duration-300">{interlocutor.username}</div>
            </CardContent>
        </Card>
    )
};
