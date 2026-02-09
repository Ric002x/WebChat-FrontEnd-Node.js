"use client";

import { useTheme } from "next-themes";
import { ChatLayout } from "../components/Layouts/Chat";
import { ChatList } from "../components/Layouts/ChatList";
import { useChatStore } from "../stores/chatStore";

export default function Home() {
    const { chat } = useChatStore()
    const { theme } = useTheme()
    return (
        <>
            <div className="flex h-main w-full overflow-hidden relative max-[980px]:flex-row-reverse">
                <ChatList showChats={true}
                    className={`max-[980px]:w-full max-[980px]:absolute transform transition-all duration-500 ${chat ? "max-[980px]:-translate-x-full" : "max-[980px]:translate-x-0"}`} />

                <div className={`bg-background-chat flex-1 h-full max-[980px]:w-full max-[980px]:absolute transform transition-all duration-500 ${chat ? "max-[980px]:translate-x-0" : "max-[980px]:translate-x-full"}`}>
                    {
                        chat ? <ChatLayout />
                            :
                            <div className="flex flex-col gap-4 justify-center items-center w-full h-full relative text-black/60 dark:text-white/60">
                                <p>Nada para ver ainda...</p>
                                <div className={theme === "dark" ? "loader-dark" : "loader-light"}></div>
                                <p className="absolute bottom-4">Selecione uma conversa ou inicie uma nova</p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
