import { API_URL } from "./lib/constants";
import { NextResponse } from "next/server";
import type { MiddlewareConfig } from "next/server";

export async function middleware() {
  try {
    await fetch(new URL("/", API_URL));
  } catch (error) {
    return NextResponse.json(
      { error, text: "API is not responding" },
      { status: 500 },
    );
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
