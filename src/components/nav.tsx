"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavProps {
  user: { username: string; role: string } | null;
}

export default function Nav({ user }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="font-bold text-lg">
            MyApp
          </Link>

          <div className="flex space-x-4">
            <Link
              href="/"
              className={cn(
                "px-2 py-1 rounded-md transition-colors",
                pathname === "/"
                  ? "bg-slate-200 font-medium"
                  : "hover:bg-slate-200"
              )}
            >
              Home
            </Link>

            {user && user.role === "admin" && (
              <Link
                href="/admin"
                className={cn(
                  "px-2 py-1 rounded-md transition-colors",
                  pathname === "/admin"
                    ? "bg-slate-200 font-medium"
                    : "hover:bg-slate-200"
                )}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <div>
          {user ? (
            <div className="text-sm">
              <span className="mr-2">Hi, {user.username}</span>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                "px-3 py-1 rounded-md transition-colors",
                pathname === "/login"
                  ? "bg-slate-200 font-medium"
                  : "hover:bg-slate-200"
              )}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
