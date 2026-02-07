import { User } from "./User";

export type Message = {
    id: number,
    body: string,
    user: User,
    createdAt: Date,
    viewedAt: Date | null,
}

export type APICreateMessage = {
    message: Message
}

export type APIGetMessages = {
    messages: Message[]
}

export type APIDeleteMessage = {
    message: string
}

export type UpdateMessageEvent = {
    type: "create" | "delete",
    message?: Message,
    query: {
        chatId: number,
        messageId?: number
    }
}

export type MarkMessageAsSeenEvent = {
    query: {
        chatId: number,
        excludUserId: number
    }
}