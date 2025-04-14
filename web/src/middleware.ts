import { NextResponse } from "next/server";
import { _axios } from "./providers/axios/ssr";
import { type MiddlewareConfig } from "next/server";

export async function middleware() {
  try {
    await _axios.get("/");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { text: "API is not responding" },
      { status: 500 },
    );
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
