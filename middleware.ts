import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Session auffrischen (wichtig für @supabase/ssr)
  const { data: { user } } = await supabase.auth.getUser()

  // Geschützte Routen: Weiterleitung zum Login
  const protectedPaths = ['/dashboard', '/admin']
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin-Seiten: Nur für Admin-Emails zugänglich
  const ADMIN_EMAILS = ['ehsan.amiri.de1986@gmail.com', 'hakmoh@outlook.de']
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  if (isAdminPage && user && !ADMIN_EMAILS.includes(user.email || '')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Eingeloggte User von Auth-Seiten weiterleiten
  const authPaths = ['/login', '/registrieren']
  const isAuthPage = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthPage && user) {
    const isAdminUser = ADMIN_EMAILS.includes(user.email || '')
    return NextResponse.redirect(new URL(isAdminUser ? '/admin' : '/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
