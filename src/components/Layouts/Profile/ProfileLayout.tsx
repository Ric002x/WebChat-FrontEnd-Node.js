"use client";

import { ChatList } from "../ChatList"

export const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    // Exibir a lista de conversa sem os contatos.
    // Paralelo entre *informação do usuário* e *edição de dados*
    return (
        <div className="flex h-full w-full overflow-hidden relative max-[980px]:flex-row-reverse">
            <ChatList showChats={false}
                className={`max-[980px]:w-full max-[980px]:absolute transform transition-all duration-500 max-[980px]:-translate-x-full`} />

            <div className={`bg-background-chat flex-1 h-full max-[980px]:w-full max-[980px]:absolute transform transition-all duration-500 max-[980px]:translate-x-0`}>
                {children}
            </div>
        </div >
    )
}