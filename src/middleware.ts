import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Get user from cookie
  const user = request.cookies.get("user")?.value;
  const userData = user ? JSON.parse(user) : null;

  // Check if the path is admin and user is not admin
  if (currentPath.startsWith("/admin")) {
    if (!userData || userData.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
};
