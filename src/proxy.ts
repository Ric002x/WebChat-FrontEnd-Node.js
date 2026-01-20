import { NextRequest, NextResponse } from "next/server";
import { handleGetUser } from "./lib/server/auth";


export async function proxy(request: NextRequest) {
    const user = await handleGetUser()

    // Redirecionar para página de Login caso não houver usuário autenticado
    if (!request.nextUrl.pathname.startsWith('/auth') && !user) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/auth') && user) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/((?!.*\\..*|_next).*)'
}