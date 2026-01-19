import z from "zod";

export const newChatSchema = z.object({
    username: z.string().min(1, { error: "Digite um nome de usuário" })
})

export type NewChatData = z.infer<typeof newChatSchema>