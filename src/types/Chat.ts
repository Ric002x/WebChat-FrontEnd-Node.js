import { Message } from "./Message"
import { User } from "./User"

export type Chat = {
    id: number,
    lastMessage: Message | null,
    unseenCount: number | null,
    user: User,
    viewedAt: Date | null,
    createdAt: Date
}

export type APIGetChats = {
    chats: Chat[]
}

export type APICreateChat = {
    chat: Chat
}

export type APIDeleteChat = {
    message: string
}

export type UpdateChatEvent = {
    type?: "delete",
    query: {
        chatId?: number,
        users: number[]
    }
}