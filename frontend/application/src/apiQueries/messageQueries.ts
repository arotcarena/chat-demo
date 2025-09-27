import type { Message } from "../types";
import { baseQuery } from "./baseQuery";

type MessagesResponse = {
    messages: Array<Message>;
    conversation_id: number;
};

type CountUnreadByInterlocutorResponse = {
    [interlocutorId: number]: number;
};

export const getMessages = async (firstUserId: number, secondUserId: number): Promise<MessagesResponse> => {
    return baseQuery<MessagesResponse>('/api/messages', { first_user_id: firstUserId, second_user_id: secondUserId }, 'GET');
}

export const getCountUnreadByInterlocutor = async (receiverId: number): Promise<CountUnreadByInterlocutorResponse> => {
    return baseQuery<CountUnreadByInterlocutorResponse>('/api/messages/count_unread_by_interlocutor/' + receiverId, {}, 'GET');
}
