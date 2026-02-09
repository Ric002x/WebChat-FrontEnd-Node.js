"use client";

import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserPassword } from "@/src/lib/requests";
import { UpdatePasswordData, updatePasswordSchema } from "@/src/lib/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProfileLayout } from "./ProfileLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const UpdatePassword = () => {

    const form = useForm<UpdatePasswordData>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            confirmPassword: ""
        }
    })

    const handlePasswordUpdate = async (data: UpdatePasswordData) => {
        const response = await updateUserPassword(data)

        if (response.error) {
            toast.error(response.error.message, { position: "top-center" })
            return
        }

        toast.success("senha atualizada com sucesso", { position: "top-center" })
        form.reset()
    }

    return (
        <ProfileLayout>
            <div className="p-8">
                <Link href={'/'} className="w-fit text-[10px] text-primary flex gap-1 items-center mb-6"><ArrowLeft className="size-4" /> voltar ao início</Link>

                <h2 className="text-xl font-bold mb-12">Atualizar senha</h2>

                <form className="w-70 min-[980px]:w-100" onSubmit={form.handleSubmit(handlePasswordUpdate)}>
                    <FieldGroup>
                        <Controller
                            name="currentPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-current-password" className="mb-2 text-black/60 dark:text-white/60">Senha atual</Label>
                                        <Input
                                            {...field}
                                            id="form-current-password"
                                            type="password"
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
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-new-password" className="mb-2 text-black/60 dark:text-white/60">Nova senha</Label>
                                        <Input
                                            {...field}
                                            id="form-new-password"
                                            type="password"
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
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div>
                                        <Label htmlFor="form-confirm-password" className="mb-2 text-black/60 dark:text-white/60">Confirme a senha</Label>
                                        <Input
                                            {...field}
                                            id="form-confirm-password"
                                            type="password"
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

                    <Button type="submit" className="mt-8 text-white">Atualizar</Button>

                </form>
            </div>
        </ProfileLayout>
    )
}