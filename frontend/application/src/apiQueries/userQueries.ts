import type { User } from "../types";
import { baseQuery } from "./baseQuery";

export const getUsers = async (): Promise<User[]> => {
    return baseQuery<User[]>('/api/users', {}, 'GET');
}

export const getUserByUsername = async (username: string): Promise<User> => {
    return baseQuery<User>(`/api/users/${username}`, {}, 'GET');
}
