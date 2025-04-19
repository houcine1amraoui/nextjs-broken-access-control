import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, role } = await request.json();

  // Set the cookie with user information
  (
    await // Set the cookie with user information
    cookies()
  ).set({
    name: "user",
    value: JSON.stringify({ username, role }),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "strict",
  });

  return NextResponse.json({ success: true });
}
