import type { User } from "../types";
import { baseQuery } from "./baseQuery";

export const getUsers = async (): Promise<User[]> => {
    const response = await baseQuery<User[]>('/api/users', {}, 'GET');
    return response;
}
