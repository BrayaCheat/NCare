import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const fd = await req.formData();
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    const {
      data: { user },
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return NextResponse.redirect(url.origin, {
      status: 301,
    });
  } catch (error) {
    console.log(error);
  }
}
