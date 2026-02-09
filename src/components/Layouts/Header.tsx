'use client';

import { Button } from "@/components/ui/button"
import { handleLogout } from "@/src/lib/server/auth"
import { useAuthStore } from "@/src/stores/authStore"
import { useChatStore } from "@/src/stores/chatStore"
import { EllipsisVertical, LogOut, Moon, Sun, User, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const Header = () => {
    const { theme, setTheme } = useTheme()
    const { clearUser } = useAuthStore()
    const { setChat } = useChatStore()
    const [optionsOpen, setOptionsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        // Sempre que a rota mudar, fechamos o menu
        setOptionsOpen(false);
    }, [pathname]);

    const handleUserLogout = async () => {
        await handleLogout()
        setChat(null)
        clearUser()
        toast.success("Saiu com sucesso", { position: "top-center" })
    }

    return (
        <header className="h-header bg-background border-b-2 border-black/25 dark:border-white/25 relative">
            {optionsOpen ?
                <>
                    <div className="absolute top-0 left-0 w-screen h-screen z-10 bg-black/30" onClick={() => setOptionsOpen(!optionsOpen)}></div>

                    <div className="absolute z-20 p-4 w-40 flex flex-col gap-2 bg-foreground rounded-lg shadow-md top-15 right-15 min-[660px]:hidden text-black dark:text-white">
                        <span className="hover:underline">
                            <User className="inline size-3 mr-2" />
                            <Link href={'/perfil'} className="inline text-[14px]">Perfil</Link>
                        </span>
                        <span className="hover:underline">
                            <LogOut className="inline size-3 mr-2" />
                            <span onClick={handleUserLogout} className="inline text-[14px]">Sair</span>
                        </span>
                    </div>
                </>
                : ""}

            <nav className="flex items-center justify-between h-full w-[80%] mx-auto">
                <div>
                    <h1 className="text-2xl bold"><Link href={'/'}>WebChat</Link></h1>
                </div>

                <div className="flex flex-row-reverse gap-4 min-[660px]:flex-row">

                    <div className="hidden min-[660px]:flex min-[660px]:items-center gap-4">
                        <span className="hover:border-b hover:border-black dark:hover:border-white">
                            <User className="inline size-3 mr-2" />
                            <Link href={'/perfil'} className="inline text-[14px]">Perfil</Link>
                        </span>
                        <span className="hover:border-b hover:border-black dark:hover:border-white cursor-pointer">
                            <LogOut className="inline size-3 mr-2" />
                            <span onClick={handleUserLogout} className="inline text-[14px]">Sair</span>
                        </span>
                    </div>

                    <div className="min-[660px]:hidden z-20">
                        <Button variant={"link"} className="flex flex-col gap-0.5" onClick={() => setOptionsOpen(!optionsOpen)}>
                            <EllipsisVertical className={`h-[1.2rem] w-[1.2rem]  rotate-0 transition-all text-black dark:text-white ${optionsOpen ? "scale-0 -rotate-90" : "scale-100"} `} />
                            <X className={`absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all text-black dark:text-white ${optionsOpen ? "scale-100 rotate-0" : ""} `} />
                        </Button>
                    </div>

                    <span>
                        <Button variant="link" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="hover:border hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-black" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-white" />
                        </Button>
                    </span>
                </div>
            </nav>
        </header>
    )
}