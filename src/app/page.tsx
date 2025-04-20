import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>

      {user && (
        <div className="mb-6 rounded-md">
          <p>
            You are logged in as{" "}
            <span className="font-semibold">{user.username}</span> (role:{" "}
            {user.role})
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Link href="/login">
          <Button size="sm">Login</Button>
        </Link>
        <Link href="/admin">
          <Button size="sm">Go to Admin Panel</Button>
        </Link>
      </div>
    </main>
  );
}
