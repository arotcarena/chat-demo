import type { User } from "@/types";
import { atom, useAtomValue } from "jotai"

export const meAtom = atom<User | null | false>(null)

export const useAuthMe = (): User => {
    const me = useAtomValue(meAtom);
    if (!me) {
        throw new Error('User not found');
    }
    return me;
}

export const lastUsernameAtom = atom<string | null>(null);
