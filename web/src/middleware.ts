import { NextResponse } from "next/server";
import { _axios } from "./providers/axios/ssr";
import type { MiddlewareConfig, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    await _axios.get("/");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { text: "API is not responding" },
      { status: 500 },
    );
  }
  const isPrivate = pathname.startsWith("/private");
  const refresh_token = request.cookies.get("refresh_token")?.value;

  if (refresh_token === undefined && isPrivate === true) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (refresh_token !== undefined) {
    const response = await fetch(
      new URL("/auth/check-refresh-token-integrity", process.env.API_URL),
      {
        headers: {
          Cookie: `refresh_token=${refresh_token}`,
        },
      },
    );

    if (isPrivate === true && response.ok === false) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    if (pathname === "/auth/sign-in" && response.ok === true) {
      return NextResponse.redirect(new URL("/private", request.url));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
