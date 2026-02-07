"use client";

import { createChat, getChats } from "@/src/lib/requests"
import { useAuthStore } from "@/src/stores/authStore"
import { useChatStore } from "@/src/stores/chatStore"
import { UpdateChatEvent } from "@/src/types/Chat"
import { useEffect } from "react"
import { toast } from "sonner"
import { socket } from "../../Providers"
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewChat } from "./NewChat";

export const ChatList = ({ className, showChats, showList = false }: { showChats: boolean, showList: boolean, className: string }) => {
    const { chat: currentChat, setChat, chats, setChats, setShowNewChat } = useChatStore()
    const { user } = useAuthStore()


    const handleGetChats = async () => {
        const response = await getChats()

        if (response.data) {
            setChats(response.data?.chats)
        }
    }

    useEffect(() => {
        showChats && handleGetChats()
    }, [])


    useEffect(() => {
        const handleUpdateChats = (data: UpdateChatEvent) => {
            if (user && data.query.users.includes(user.id)) {
                handleGetChats()
            }

            if (data.type === "delete" && data.query.chatId === currentChat?.id) {
                setChat(null)
                toast.info('A conversa foi deletada', { position: "top-center" })
            }
        }

        socket.on("updateChat", handleUpdateChats);

        return () => {
            socket.off("updateChat", handleUpdateChats);
        }
    }, [currentChat])

    const handleCreateChat = async (username: string) => {
        const response = await createChat({ username })

        if (response.error) {
            toast.error(response.error.message, { position: "top-center" })
            return
        }

        toast.success("chat criado", { position: "top-center" })
        setChat(response.data.chat)
    }

    return (
        <div
            className={cn(
                "px-5 bg-background min-[980px]:w-100 border-r border-black/20 relative", className)
            }
        >
            <div className="absolute bottom-3 right-3 bg-none">
                <NewChat createChat={handleCreateChat}></NewChat>
            </div>

            <div className="flex items-center gap-4 py-5 border-b border-black/25 dark:border-white/25">
                <Avatar className="size-15">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[20px] font-bold">{user?.name}</h2>
                    <span>{user?.username}</span>
                </div>
            </div>

            {showList &&
                <div className="mt-8 space-y-2 w-full">
                    <h3 className="font-bold">Conversas</h3>
                    {chats && chats.map(chat => (
                        <div key={chat.id}
                            className={`flex gap-2 p-2 items-center cursor-pointer hover:bg-linear-135 hover:from-primary/10 hover:to-secondary/10 transform transition-scale duration-200 active:scale-96 rounded-md
                            ${currentChat?.id === chat.id ? "bg-linear-135 from-primary/10 to-secondary/10" : ""}`}
                            onClick={() => setChat(chat)}
                        >
                            <Avatar className="size-15">
                                <AvatarImage src={chat?.user.avatar} alt={chat?.user.name} />
                                <AvatarFallback>{chat?.user.name.slice(0, 2)}</AvatarFallback>
                                {dayjs().subtract(5, "minutes").isBefore(dayjs(chats?.find(item => item.id === chat?.id)?.user.lastAccess)) && <AvatarBadge className="bg-green-600" />}
                            </Avatar>

                            <div className="space-y-1 w-full overflow-hidden">
                                <div className="flex justify-between">
                                    <h3 className="text-[16px] font-bold">{chat.user.username}</h3>
                                    <span className="text-[12px]">{dayjs(chat.lastMessage?.createdAt).format("DD/MM/YYYY [às] HH:mm")}</span>
                                </div>
                                <p className="truncate text-[12px] max-w-[80%]">{chat.lastMessage?.body}</p>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}