import { baseQuery } from "./baseQuery";

export const getMe = async (): Promise<{userId: number, username: string}> => {
    return baseQuery<{userId: number, username: string}>('/api/auth/me', {}, 'GET');
}
