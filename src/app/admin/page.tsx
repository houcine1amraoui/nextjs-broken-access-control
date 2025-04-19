import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminPage() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  // Check if user is authenticated and has admin role
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">admin</p>
                    <p className="text-sm text-muted-foreground">
                      Role: Administrator
                    </p>
                  </div>
                  <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Active
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">user</p>
                    <p className="text-sm text-muted-foreground">
                      Role: Regular User
                    </p>
                  </div>
                  <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Active
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
            <CardDescription>Overview of system usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span>Total Users</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Administrators</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Regular Users</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Sessions</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
