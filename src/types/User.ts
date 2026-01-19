export type User = {
    id: number,
    name: string,
    email: string,
    username: string,
    avatar: string,
    lastAccess: Date
}

export type APIUpdateUser = {
    user: User
}