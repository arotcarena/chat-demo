import type { User } from "../../types";

type Props = {
    interlocutor: User;
    countUnread: number;
};

export const InterlocutorCard = ({
    interlocutor,
    countUnread,
}: Props) => {
    return (
        <div className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-md cursor-pointer block">
            {interlocutor.username} {countUnread > 0 && <span className="text-red-500">{countUnread}</span>}
        </div>
    )
};
