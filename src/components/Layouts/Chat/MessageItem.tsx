import { useAuthStore } from "@/src/stores/authStore"
import { Message } from "@/src/types/Message"
import dayjs from "dayjs"

type Props = {
    data: Message,
    // onDelete: (messageId: number) => void;
}

export const MessageItem = ({ data }: Props) => {
    const { user } = useAuthStore()


    return (
        <div className={`flex ${data.user.id === user?.id ? "justify-end" : "justify-start"}`}>
            <div className="space-y-1">
                <div className={`min-[980px]:max-w-160 max-w-60 py-2 px-4 shadow-sm ${data.user.id === user?.id ? "bg-text-background rounded-[8px_8px_0px_8px]" : "bg-[#e9e9e9] rounded-[8px_8px_8px_0px]"}`}>

                    <p className="text-black text-[14px] wrap-break-word">
                        {data.body}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-[10px]">
                        {dayjs(data.createdAt).format("DD/MM/YYYY [às] HH:mm")}
                    </span>
                </div>
            </div>
        </div>
    )
}