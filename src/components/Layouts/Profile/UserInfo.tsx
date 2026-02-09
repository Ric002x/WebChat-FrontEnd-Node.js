"use client";

import { Button } from "@/components/ui/button"
import { updatedTime } from "@/src/lib/utils"
import { useAuthStore } from "@/src/stores/authStore"
import Link from "next/link"
import { ProfileLayout } from "./ProfileLayout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";

export const UserInfo = () => {
    const { user } = useAuthStore()

    return (
        <ProfileLayout>
            <div className="p-10 overflow-y-scroll h-main">
                <div className="min-[980px]:hidden mb-12">
                    <Avatar className="size-24 mb-4">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                        <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <p className="text-xl font-bold">{user?.name}</p>
                    <span className="text-black/60 dark:text-white/60">@{user?.username}</span>
                </div>

                <h2 className="text-2xl">Dados do usuário</h2>

                <div className="space-y-4 my-8">
                    <div className="py-2 w-full border-b border-black/40 dark:border-white/40 flex">
                        <span className="text-black/40 dark:text-white/40 min-w-40 min-[980px]:min-w-100">Nome completo</span>
                        <p>{user?.name}</p>
                    </div>

                    <div className="py-2 w-full border-b border-black/40 dark:border-white/40 flex">
                        <span className="text-black/40 dark:text-white/40 min-w-40 min-[980px]:min-w-100">Nome de usuário</span>
                        <p>{user?.username}</p>
                    </div>

                    <div className="py-2 w-full border-b border-black/40 dark:border-white/40 flex">
                        <span className="text-black/40 dark:text-white/40 min-w-40 min-[980px]:min-w-100">Email</span>
                        <p>{user?.email}</p>
                    </div>

                    <div className="py-2 w-full border-b border-black/40 dark:border-white/40 flex">
                        <span className="text-black/40 dark:text-white/40 min-w-40 min-[980px]:min-w-100">Data de nascimento</span>
                        <p>{dayjs(user?.birthday).format("DD/MM/YYYY")}</p>
                    </div>
                </div>

                <Button variant={'default'} className="text-white transform transition-all active:scale-90">
                    <Link href={'/perfil/editar-usuario'}>Editar</Link>
                </Button>

                <h2 className="text-2xl mt-12">Segurança da conta</h2>
                <div className="space-y-4 my-8">
                    <div className="py-2 w-full border-b border-black/40 dark:border-white/40 flex">
                        <span className="text-black/40 dark:text-white/40 min-w-40 min-[980px]:min-w-100">Senha</span>
                        <p>Última atualização{user?.passwordUpdatedAt ? ` ${updatedTime(user.passwordUpdatedAt)}` : ": Nunca"}</p>
                    </div>
                </div>

                <Button variant={'default'} className="text-white transform transition-all active:scale-90">
                    <Link href={'/perfil/editar-senha'}>Atualizar senha</Link>
                </Button>
            </div>
        </ProfileLayout>
    )
}