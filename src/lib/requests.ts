"use server";

import { APILogin, APIRegister } from "../types/Auth";
import { APICreateChat, APIDeleteChat, APIGetChats } from "../types/Chat";
import { APICreateMessage, APIGetMessages } from "../types/Message";
import { APIUpdateUser } from "../types/User";
import { api } from "./api";
import { LoginData, RegisterData } from "./schemas/authSchema";
import { NewChatData } from "./schemas/chatSchemas";
import { UpdatePasswordData, UpdateUserData } from "./schemas/userSchema";


// Auth and User
export const login = async (data: LoginData) => {
    return await api<APILogin>({
        endpoint: "/auth/login",
        method: "POST",
        data,
        withAuth: false
    })
}

export const register = async (data: RegisterData) => {
    return await api<APIRegister>({
        endpoint: "/auth/register",
        method: "POST",
        data,
        withAuth: false
    })
}

export const updateUser = async (data: UpdateUserData) => {
    return await api<APIUpdateUser>({
        endpoint: "/user/update",
        method: "PUT",
        data,
        withAttachment: true
    })
}

export const updateUserPassword = async (data: UpdatePasswordData) => {
    return await api<APIRegister>({
        endpoint: "/user/update-password",
        method: "PUT",
        data,
    })
}


// Chats
export const getChats = async () => {
    return await api<APIGetChats>({
        endpoint: "/chat",
        method: "GET",
    })
}

export const createChat = async (data: NewChatData) => {
    return await api<APICreateChat>({
        endpoint: "/chat",
        method: "POST",
        data,
    })
}

export const deleteChat = async (chatId: number) => {
    return await api<APIDeleteChat>({
        endpoint: `/chat/${chatId}`,
        method: "DELETE",
    })
}


// Messages
export const getMessages = async (chatId: number) => {
    return await api<APIGetMessages>({
        endpoint: `/chat/message/${chatId}`,
        method: "GET"
    })
}

export const createMessage = async (chatId: number, data: FormData) => {
    return await api<APICreateMessage>({
        endpoint: `/chat/message/${chatId}`,
        method: "POST",
        data
    })
}

export const deleteMessage = async (chatId: number, messageId: number) => {
    return await api<APICreateMessage>({
        endpoint: `/chat/message/${chatId}/${messageId}`,
        method: "DELETE"
    })
}