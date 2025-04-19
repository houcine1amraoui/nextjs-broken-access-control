import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  async function handleLogout() {
    "use server";
    (await cookies()).delete("user");
    redirect("/");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>

      {user ? (
        <div className="mb-6 p-4 bg-green-50 rounded-md">
          <p className="text-green-700">
            Logged in as <span className="font-semibold">{user.username}</span>{" "}
            ({user.role})
          </p>
          <form action={handleLogout} className="mt-2">
            <Button type="submit" variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      ) : (
        <p className="mb-6">Please log in to access all features.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Public Content</h2>
          <p className="text-gray-600 mb-4">
            This content is visible to everyone.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">User Content</h2>
          <p className="text-gray-600 mb-4">
            This content is visible to logged-in users.
          </p>
          {!user && (
            <Link href="/login">
              <Button size="sm">Login to View</Button>
            </Link>
          )}
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
          <p className="text-gray-600 mb-4">
            Only administrators can access this area.
          </p>
          {user?.role === "admin" ? (
            <Link href="/admin">
              <Button size="sm">Go to Admin</Button>
            </Link>
          ) : (
            <p className="text-sm text-amber-600">Admin access required</p>
          )}
        </div>
      </div>
    </main>
  );
}
