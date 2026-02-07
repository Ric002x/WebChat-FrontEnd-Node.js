"use client";

import { Button } from "@/components/ui/button"
import { deleteChat } from "@/src/lib/requests"
import { useChatStore } from "@/src/stores/chatStore"
import { ChevronLeft } from "lucide-react"
import dayjs from "dayjs";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const ChatHeader = () => {
    const { chat, chats, setChat } = useChatStore()

    const userIsOnline = dayjs().subtract(5, "minutes").isBefore(dayjs(chats?.find(item => item.id === chat?.id)?.user.lastAccess))

    const handleDeleteChat = async () => {
        if (!chat) return
        await deleteChat(chat.id)
    }

    return (
        <header className="flex w-full gap-6 px-6 items-center bg-linear-0 from-primary to-secondary rounded-xl">
            <Button variant="link" onClick={() => setChat(null)} className="rounded-md p-2 bg-white hover:bg-white/80 cursor-pointer transform transition-all size-7 active:scale-90">
                <ChevronLeft className="text-primary stroke-8 size-4" />
            </Button>

            <div className="flex items-center gap-4 py-4">
                <Avatar className="size-15">
                    <AvatarImage src={chat?.user.avatar} alt={chat?.user.name} />
                    <AvatarFallback>{chat?.user.name.slice(0, 2)}</AvatarFallback>
                    {userIsOnline && <AvatarBadge className="bg-green-600 ring-primary" />}
                </Avatar>

                <div className="flex flex-col gap-1">
                    <h2 className="text-[20px] max-[980px]:text-[16px] font-bold">{chat?.user.name}</h2>
                    <span className="max-[980px]:text-[12px]">@{chat?.user.username}</span>
                </div>
            </div>
        </header>
    )
}