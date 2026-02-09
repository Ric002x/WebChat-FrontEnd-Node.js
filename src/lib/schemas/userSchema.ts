import z from "zod"

export const updateUserSchema = z.object({
    name: z.string({ error: "Campo obrigatório" })
        .min(5, { error: "Mínimo de 5 caracteres" })
        .max(50, { error: "Máximo de 50 caracteres" }),
    email: z.email({ error: "Campo obrigatório" }),
    username: z.string({ error: "Campo obrigatório" })
        .min(5, { error: "Mínimo de 5 caracteres" })
        .max(15, { error: "Máximo de 15 caracteres" }),
    birthday: z.iso.date({ error: "Data inválida" })
})

export type UpdateUserData = z.infer<typeof updateUserSchema>

export const updatePasswordSchema = z.object({
    currentPassword: z.string({ error: "Campo obrigatório" }),
    password: z.string({ error: "Campo obrigatório" })
        .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, { error: "A senha deve ter o mínimo de 8 caracteres, e conter ao menos um número e um caractere especial" }),
    confirmPassword: z.string({ error: "Campo obrigatório" })
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        error: "As senhas não coincidem", path: ["confirmPassword"]
    }
)

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>