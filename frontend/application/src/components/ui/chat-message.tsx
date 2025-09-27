import { cn } from "@/lib/utils";
import type { Message } from "../../types";
import { useAuthMe } from "@/jotai/atoms";

type Props = {
    message: Message;
};

export const ChatMessage = ({
    message,
}: Props) => {
    const me = useAuthMe();

    return (
        <li
            className={cn(
                'px-4 py-3 rounded-md min-w-60 max-w-90 shadow-xs',
                message.sender_id === me.id ? ' self-end' : ' self-start',
                message.sender_id === me.id ? ' bg-rose-500 text-white' : ' bg-white border border-gray-100'
            )}
        >
            <div>{message.content}</div>
            <div className="text-xs font-light text-right relative top-1.5 left-1.5">{new Date(message.created_at).toLocaleString()}</div>
        </li>
    );
}
