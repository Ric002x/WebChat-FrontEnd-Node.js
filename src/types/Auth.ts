import { User } from "./User";

export type APILogin = {
    user: User,
    accessToken: string
}

export type APIRegister = {
    user: User,
    accessToken: string
}