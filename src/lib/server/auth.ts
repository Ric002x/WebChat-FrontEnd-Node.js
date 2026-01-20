"use server";

import { login, register } from "@/src/lib/requests";
import { LoginData, RegisterData } from "@/src/lib/schemas/authSchema";
import { User } from '@/src/types/User';
import { cookies } from "next/headers";

export const handleLogin = async (data: LoginData) => {
    const response = await login(data)

    if (response.data) {
        (await cookies()).set({
            name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
            value: response.data.accessToken,
            httpOnly: true,
            maxAge: 86400 * 30
        })
    }

    return response
}

export const handleRegister = async (data: RegisterData) => {
    const response = await register(data)

    if (response.data) {
        (await cookies()).set({
            name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
            value: response.data.accessToken,
            httpOnly: true,
            maxAge: 86400 * 30
        })
    }

    return response
}

export const handleGetUser = async () => {
    const authCookies = (await cookies()).get(process.env.NEXT_PUBLIC_AUTH_KEY as string)?.value

    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/user/me', {
        headers: {
            Authorization: `Bearer ${authCookies}`
        }
    })

    const jsonResponse = await response.json()
    const userData = jsonResponse.user

    if (userData) return userData as User

    return null
}


export const handleLogout = async () => {
    (await cookies()).delete(process.env.NEXT_PUBLIC_AUTH_KEY as string)
}