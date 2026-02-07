"use client";

import { useChatStore } from "@/src/stores/chatStore"
import { ChatHeader } from "./Header"
import { ChatFooter } from "./Footer";
import { useAuthStore } from "@/src/stores/authStore";
import { useEffect, useRef } from "react";
import { createMessage, getMessages } from "@/src/lib/requests";
import { toast } from "sonner";
import { MarkMessageAsSeenEvent, UpdateMessageEvent } from "@/src/types/Message";
import { socket } from "../../Providers";
import dayjs from "dayjs";
import { MessageItem } from "./MessageItem";

export const ChatLayout = () => {
    const { chat, chatMessages, loading, setLoading, setChatMessages } = useChatStore()
    const { user } = useAuthStore()

    const bodyMessagesRef = useRef<HTMLDivElement>(null)

    const handleGetMessages = async () => {
        if (!chat) return
        const response = await getMessages(chat.id)

        if (response.error || !response.data) {
            toast.error("Erro ao buscar mensagens", { position: "top-center" })
            return
        }

        setChatMessages(response.data.messages)
    }

    const handleSendMessage = async (data: { body: string }) => {
        if (!chat) return

        const response = await createMessage(chat.id, data);

        if (response.error || !response.data) {
            toast.error(response.error.message, { position: "top-center" })
            return
        }
    }

    const scrollToBottom = () => {
        bodyMessagesRef.current?.scrollIntoView(false)
    }

    useEffect(() => {
        if (chatMessages === null) handleGetMessages()
    }, [chat])

    useEffect(() => {
        if (chatMessages && chatMessages.length > 0) {
            scrollToBottom()
        }

        const handleUpdateMessage = (data: UpdateMessageEvent) => {
            if (chatMessages && data.query.chatId === chat?.id) {
                switch (data.type) {
                    case 'create':
                        if (data.message) setChatMessages([...chatMessages, data.message])

                        break;
                    case 'delete':
                        setChatMessages(chatMessages.filter(message => message.id !== data.query.messageId))
                }

                if (data.message && data.message.user.id !== user?.id) {
                    socket.emit('updateMessagesAsSeen', {
                        chatId: chat.id,
                        exclude_user_id: user?.id
                    })
                }
            }
        }

        const handleMarkMessagesAsSeen = (data: MarkMessageAsSeenEvent) => {
            if (chatMessages && data.query.chatId === chat?.id && data.query.excludUserId !== user?.id) {
                const updateMessages = chatMessages.map(message => {
                    if (message.viewedAt) return message;

                    return {
                        ...message, viewedAt: dayjs().toDate()
                    }
                })

                setChatMessages(updateMessages)
            }
        }

        socket.on("updateChatMessages", handleUpdateMessage);
        socket.on("markMessagesAsSeen", handleMarkMessagesAsSeen);

        return () => {
            socket.off("updateChatMessage", handleUpdateMessage);
            socket.off("markMessagesAsSeen", handleMarkMessagesAsSeen);
        }
    }, [chatMessages])


    return (
        <div className={"flex h-full flex-col flex-1 bg-background-chat p-4"}>
            <ChatHeader />

            <div className="flex-1 overflow-auto mt-4">
                <div className="space-y-2 p-7" ref={bodyMessagesRef}>
                    {chatMessages?.map(data => (
                        <div key={data.id}>
                            <MessageItem data={data} />
                        </div>
                    ))}
                </div>
            </div>

            <ChatFooter onSendMessage={handleSendMessage} />
        </div>
    )
}