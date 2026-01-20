"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { io } from "socket.io-client"

// socket
export const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000")

export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>
        {children}
    </NextThemesProvider>
}