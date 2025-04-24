import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res})
  const {data: {session}} = await supabase.auth.getSession();
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return res;
}

export const config = {
  matcher: [
    /*
      Match all routes EXCEPT:
      - API routes
      - _next static/image
      - files with extensions like .ico, .png, etc.
    */
   "/admin/:path*",
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
