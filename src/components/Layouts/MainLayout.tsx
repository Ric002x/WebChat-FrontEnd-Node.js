"use client";

import { Header } from "./Header"
import { useEffect } from "react"
import { useAuthStore } from "@/src/stores/authStore"
import { User } from "@/src/types/User"

export const MainLayout = ({ user, children }: { children: React.ReactNode, user: User | null }) => {
    const auth = useAuthStore()

    useEffect(() => {
        if (user) auth.setUser(user)
    }, [])

    return (
        <>
            {user ? <Header /> : ""}
            <main className="h-main w-screen bg-background">
                {children}
            </main>
        </>
    )
}