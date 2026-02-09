export type User = {
    id: number,
    name: string,
    email: string,
    username: string,
    avatar: string,
    lastAccess: Date,
    birthday: string | null,
    createdAt: Date,
    passwordUpdatedAt: Date | null
}

export type APIUpdateUser = {
    user: User
}