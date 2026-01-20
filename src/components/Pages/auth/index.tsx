"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react"
import { LoginForm } from "./LoginLayout";
import { RegisterForm } from "./RegisterLayout";

export const AuthPage = () => {
    const { theme, setTheme } = useTheme()
    const [auth, setAuth] = useState<"login" | "register">("login")


    return (
        <main className="h-screen w-screen bg-background flex justify-center items-center relative">
            <Button variant="link" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="absolute top-5 right-5 cursor-pointer z-200">
                <Sun className="h-[1.2rem] w-[1.2rem] text-black scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 max-[980px]:text-white" />
                <Moon className="absolute h-[1.2rem] text-white w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>

            <div className={
                `bg-foreground h-140 flex relative rounded-2xl
                min-[980px]:w-260
                max-[980px]:w-screen max-[980px]:h-screen max-[980px]:flex-col
                `}>

                <div className={
                    `bg-linear-135 from-primary to-secondary h-full text-white p-10 flex flex-col 
                    justify-center top-0 w-1/2
                    min-[980px]:absolute z-100 transition-transform duration-600 ease-in-out
                    ${auth === "login" ? "min-[980px]:translate-x-0 min-[980px]:rounded-l-md" : "min-[980px]:translate-x-full min-[980px]:rounded-r-md"}
                    max-[980px]:h-fit max-[980px]:w-full`
                }>
                    <h1 className="text-[32px] font-bold mb-4 max-[980px]:text-[24px]">Bem vindo ao WebChat</h1>
                    <p className="text-[14px] max-[980px]:text-10px">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea neque unde ducimus ratione laborum, enim beatae molestias, sunt maiores autem, facilis ullam sed veniam voluptates nemo. Doloremque, obcaecati eos? Non.</p>
                </div>

                <div className="h-full w-full max-[980px]:w-screen flex overflow-hidden relative">
                    <div className={`
                        h-full w-1/2 p-10 flex flex-col justify-center
                        max-[980px]:w-full max-[980px]:absolute transform transition-all duration-500 ${auth === "register" ? "max-[980px]:translate-x-0" : "max-[980px]:-translate-x-full"}
                        `}>
                        <RegisterForm setAuth={setAuth} />
                    </div>
                    <div className={`
                        h-full w-1/2 p-10 flex flex-col justify-center
                        max-[980px]:w-full max-[980px]:absolute transform transition-all duration-500 ${auth === "register" ? "max-[980px]:translate-x-full" : "max-[980px]:translate-x-0"}
                        `}>
                        <LoginForm setAuth={setAuth} />
                    </div>
                </div>


            </div>
        </main>
    )
}