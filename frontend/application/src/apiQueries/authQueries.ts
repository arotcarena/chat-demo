import type { User } from "@/types";
import { baseQuery } from "./baseQuery";

export const getMe = (): Promise<{userId: number, username: string}> => {
    return baseQuery<{userId: number, username: string}>('/api/auth/me', {}, 'GET');
}

export const postLogin = (data: {username: string, password: string}): Promise<{token: string}> => {
    return baseQuery<{token: string}>('/api/auth/login', data, 'POST');
}

export const postSignUp = (data: {username: string, password: string}): Promise<User> => {
    return baseQuery<User>('/api/auth/signup', data, 'POST');
}
