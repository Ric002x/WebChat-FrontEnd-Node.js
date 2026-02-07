import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendHorizonal } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    onSendMessage: (data: { body: string }) => void;
}

export const ChatFooter = ({ onSendMessage }: Props) => {
    const [body, setBody] = useState("")


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!body) {
            toast.error("Escreva uma mensagem para envia-la", { position: "top-center" })
            return
        }

        onSendMessage({ body })
        setBody("")
    }

    return (
        <footer className="p-4 w-full">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <Input name="body" value={body} onChange={(e) => setBody(e.target.value)}
                    className="bg-foreground dark:bg-background rounded-full w-full p-5 border-none" placeholder="Escreva sua mensagem" />

                <Button type="submit" className="size-10 rounded-full bg-foreground dark:bg-background hover:bg-foreground/40">
                    <SendHorizonal className="stroke-4 text-primary fill-primary" />
                </Button>
            </form>
        </footer>
    )
}