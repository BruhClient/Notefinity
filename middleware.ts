
import NextAuth from "next-auth"

import authConfig from "./lib/auth-config"
import { NextResponse } from "next/server"
import { ACCOUNT_VERIFICATION_PREFIX, API_ROUTE_PREFIX, AUTH_ROUTES, DEFAULT_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTES, STRIPE_WEBHOOK_ROUTE, UPLOADTHING_PREFIX } from "./route"


const {auth} = NextAuth(authConfig)

export default auth((req) => { 
    const {nextUrl} = req

    const isLoggedIn = !!req.auth

    if (nextUrl.pathname.includes(API_ROUTE_PREFIX)) return NextResponse.next()

    if (nextUrl.pathname.includes(STRIPE_WEBHOOK_ROUTE)) return NextResponse.next()
    

    if (nextUrl.pathname.includes(ACCOUNT_VERIFICATION_PREFIX)) return NextResponse.next()

    if (nextUrl.pathname.includes(UPLOADTHING_PREFIX)) return NextResponse.next()

    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)
    
    

    if (isAuthRoute) { 
        if (isLoggedIn) { 
            return NextResponse.redirect(new URL(LOGIN_ROUTE,nextUrl))
        }
        return NextResponse.next()
    }

    if (!isPublicRoute) { 
        if (isLoggedIn) { 
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL(DEFAULT_ROUTE,nextUrl))
    } 

})

export const config = { 
    matcher : ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"]
}