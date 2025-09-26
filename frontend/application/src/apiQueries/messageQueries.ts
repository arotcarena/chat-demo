import { baseQuery } from "./baseQuery";

export type MessagesResponse = {
    messages: Array<{
        id: number;
        content: string;
        created_at: string;
        sender_id: number;
        receiver_id: number;
    }>;
    conversation_id: number;
};

export const getMessages = async (firstUserId: number, secondUserId: number): Promise<MessagesResponse> => {
    return baseQuery<MessagesResponse>('/api/messages', { first_user_id: firstUserId, second_user_id: secondUserId }, 'GET');
}
