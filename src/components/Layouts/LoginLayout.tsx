import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginData, loginSchema } from "@/src/lib/schemas/authSchema"
import { handleLogin } from "@/src/lib/server/auth"
import { useAuthStore } from "@/src/stores/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    setAuth: (type: "login" | "register") => void;
}

export const LoginForm = ({ setAuth }: Props) => {
    const setUser = useAuthStore(state => state.setUser)


    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: LoginData) => {
        const response = await handleLogin(data)

        if (response.error) {
            toast.error(response.error.message, { position: "top-center" })
            return
        }

        setUser(response.data.user)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h2 className="text-[24px] max-[980px]:text-[20px] font-bold text-center">Entre com seu Email</h2>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="relative">
                                <Input
                                    {...field}
                                    id="login-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Email"
                                    autoComplete="off"
                                    className="pl-10 py-6 placeholder:text-primary/60 dark:placeholder:text-[#D7E2FF]/60 bg-primary/10 rounded-full shadow-[inset_1px_2px_5px_-2px_rgba(0,0,0,0.25)]"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-primary/60 dark:text-[#D7E2FF]/60" />
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
                            <div className="relative">
                                <Input
                                    {...field}
                                    id="login-password"
                                    type="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Senha"
                                    autoComplete="off"
                                    className="pl-10 py-6 placeholder:text-primary/60 dark:placeholder:text-[#D7E2FF]/60 bg-primary/10 rounded-full shadow-[inset_1px_2px_5px_-2px_rgba(0,0,0,0.25)]"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-primary/60 dark:text-[#D7E2FF]/60" />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="flex-col space-y-2 text-center">
                <Button variant="default" className="rounded-full px-20 py-6 mx-auto text-[16px] flex items-center text-white">Entrar</Button>
                <p>Não possui conta? <span onClick={() => setAuth("register")} className="text-primary hover:underline cursor-pointer">Crie agora</span></p>
            </div>

        </form>
    )
}