export type User = {
    id: number;
    username: string;
}

export type Message = {
    id: number;
    content: string;
    created_at: string;
    sender_id: number;
    receiver_id: number;
    status: string;
};
