import { cn } from "@/lib/utils";
import { Skeleton } from "../skeleton";

type Props = {
    position: 'end' | 'start';
};

export const ChatMessageSkeleton = ({
    position,
}: Props) => {
    return (
        <Skeleton className={cn(
            'w-80 h-22',
            position === 'end' ? ' self-end' : ' self-start',
        )} />
    );
}
