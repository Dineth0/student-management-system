import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request:NextRequest) {
    const token = request.cookies.get("token")?.value
    const pathname = request.nextUrl.pathname;

    const protectedRoutes = ["/dashboard", "/students","/course","/coursesPage","/coursesRegister"]

    if(protectedRoutes.includes(pathname) && !token){
        return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher:[
        "/dashboard/:path*",
        "/students/:path*",
        "/course/:path*",
        "coursesRegister/:path**"
    ]
}
