import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { API_URL, JWT_SECRET } from "./lib/constants";
import type { MiddlewareConfig, NextRequest } from "next/server";

const secret = new TextEncoder().encode(JWT_SECRET);

// Add controllers to protect admin, manager, employee and client routes
export async function middleware(request: NextRequest) {
  try {
    await fetch(new URL("/", API_URL));
  } catch (error) {
    return NextResponse.json(
      { error, text: "API is not responding" },
      { status: 500 },
    );
  }

  const { pathname } = request.nextUrl;
  const refresh_token = request.cookies.get("refresh_token")?.value;

  const isPrivate = pathname.startsWith("/private");

  if (refresh_token === undefined && isPrivate === true) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (refresh_token !== undefined && isPrivate === true) {
    try {
      await jwtVerify(refresh_token, secret);
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  if (refresh_token !== undefined && pathname === "/auth/sign-in") {
    try {
      await jwtVerify(refresh_token, secret);
      return NextResponse.redirect(new URL("/private", request.url));
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
