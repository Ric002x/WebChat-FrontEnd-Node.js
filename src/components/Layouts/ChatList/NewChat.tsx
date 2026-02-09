import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import MessageIcon from "@/public/ChatIcon.svg"
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    createChat: (username: string) => void;
}

export const NewChat = ({ createChat }: Props) => {
    const [username, setUsername] = useState("")

    const handleCreateChat = (e: React.FormEvent) => {
        e.preventDefault()

        if (!username) {
            toast.error("digite um nome de usuário", { position: "top-center" })
            return
        }

        createChat(username)
        setUsername("")
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="link" className="hover:bg-none">
                        <Image src={MessageIcon} alt="new message icon" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="mb-4">
                    <PopoverHeader>
                        <PopoverTitle>Nova conversa</PopoverTitle>
                        <PopoverDescription>Busque um usuário para inicar uma conversa.</PopoverDescription>
                    </PopoverHeader>

                    <form onSubmit={handleCreateChat} className="flex flex-col gap-4 mt-4">
                        <div className="relative">
                            <Input
                                id="login-email"
                                placeholder="Nome de usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10 py-4 placeholder:text-primary/60 dark:placeholder:text-[#D7E2FF]/60 bg-primary/10 rounded-full shadow-[inset_1px_2px_5px_-2px_rgba(0,0,0,0.25)]"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-primary/60 dark:text-[#D7E2FF]/60" />
                        </div>

                        <Button type="submit" variant={"default"} className="rounded-full text-white">Buscar usuário</Button>
                    </form>
                </PopoverContent>
            </Popover >
        </>
    )
}