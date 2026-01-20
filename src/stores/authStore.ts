import { create } from "zustand"
import { User } from "@/src/types/User"

export type AuthState = {
    user: User | null
}

export type AuthActions = {
    setUser: (user: User) => void,
    clearUser: () => void
}

export type AuthStore = AuthState & AuthActions


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null })
}))