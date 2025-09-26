import { atom, useAtomValue } from "jotai"
import type { User } from "../hooks/useGetMe"

export const meAtom = atom<User | null | false>(null)

export const useAuthMe = (): User => {
    const me = useAtomValue(meAtom);
    if (!me) {
        throw new Error('User not found');
    }
    return me;
}
