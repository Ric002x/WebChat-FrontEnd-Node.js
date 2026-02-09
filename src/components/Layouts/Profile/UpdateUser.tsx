"use client";

import { updateUser } from "@/src/lib/requests"
import { UpdateUserData, updateUserSchema } from "@/src/lib/schemas/userSchema"
import { useAuthStore } from "@/src/stores/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { ProfileLayout } from "./ProfileLayout"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const UpdateUser = () => {
    const { user, setUser } = useAuthStore()

    const [file, setFile] = useState<File | null>(null)
    const [fileUrl, setFileUrl] = useState("")

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.size >= 5 * 1024 * 1024) {
                toast.error("Arquivo grande demais", { position: "top-center" })
                return
            }
            setFile(file);
            setFileUrl(URL.createObjectURL(file));
        }
    }

    const form = useForm<UpdateUserData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            birthday: ""
        }
    })

    useEffect(() => {
        if (!user) return
        console.log(user.birthday)

        form.reset({
            name: user.name,
            email: user.email,
            username: user.username,
            birthday: user.birthday ? user.birthday.split("T")[0] : undefined
        })
    }, [user, form])


    const handleUpdateUser = async (data: UpdateUserData) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("username", data.username);

        if (data.birthday) {
            formData.append("birthday", data.birthday);
        }

        if (file) {
            formData.append("avatar", file);
        }

        const response = await updateUser(formData)

        if (response.error) {
            toast.error(response.error.message, { position: "top-center" })
            return
        }

        toast.success("Dados atualizados com sucesso", { position: "top-center" })
        setUser(response.data.user)
        setFile(null)
        setFileUrl("")
    }

    return (
        <ProfileLayout>
            <div className="flex flex-col h-full p-8 gap-8">
                <Link href={'/'} className="w-fit text-[10px] text-primary flex gap-1 items-center"><ArrowLeft className="size-4" /> voltar ao início</Link>
                <h2 className="text-xl font-bold">Atualizar dados</h2>
                <form className="w-70 min-[980px]:w-100" onSubmit={form.handleSubmit(handleUpdateUser)}>

                    <div className="flex flex-col gap-2 mb-16">
                        <span className="text-[14px] text-black/60 dark:text-white/60">Foto de perfil</span>

                        <div className="flex gap-12 items-center">
                            <div className="size-24 space-y-2">
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={user?.avatar} alt={user?.username} />
                                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <label htmlFor="avatar" className="text-primary text-[12px] font-bold text-center block cursor-pointer">Alterar foto</label>
                                <input id="avatar" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>

                            {fileUrl && <>
                                <ArrowBigRight />

                                <div className="size-24 space-y-2">
                                    <Avatar className="w-full h-full">
                                        <AvatarImage src={fileUrl} alt="new avatar preview" />
                                        <AvatarFallback>New Avatar</AvatarFallback>
                                    </Avatar>
                                </div>
                            </>}
                        </div>
                    </div>

                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-name" className="mb-2 text-black/60 dark:text-white/60">Nome completo</Label>
                                        <Input
                                            {...field}
                                            id="form-name"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            className="bg-background border-black/20 dark:border-white/20"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-username" className="mb-2 text-black/60 dark:text-white/60">Nome de usuário</Label>
                                        <Input
                                            {...field}
                                            id="form-name"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            className="bg-background border-black/20 dark:border-white/20"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-email" className="mb-2 text-black/60 dark:text-white/60">Email</Label>
                                        <Input
                                            {...field}
                                            id="form-name"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            className="bg-background border-black/20 dark:border-white/20"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="birthday"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-el" className="mb-2 text-black/60 dark:text-white/60">Data de Nascimento</Label>
                                        <Input
                                            {...field}
                                            id="form-name"
                                            type="date"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            className="bg-background border-black/20 dark:border-white/20"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <Button type="submit" className="mt-8 text-white">Enviar</Button>
                </form>
            </div>
        </ProfileLayout>
    )
}