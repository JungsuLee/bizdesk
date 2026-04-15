"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { BUSINESSES, USERS, ROLES } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function SuperAdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  const stats = [
    { label: "Total Businesses", value: BUSINESSES.length },
    { label: "Total Users", value: USERS.filter((u) => !u.isSuperAdmin).length },
    { label: "Total Roles", value: ROLES.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BizDesk</h1>
            <p className="text-xs text-gray-400">Platform Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-blue-600 font-semibold">Super Admin</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all businesses using BizDesk.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {s.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Businesses table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registered Businesses</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Enabled Modules</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BUSINESSES.map((biz) => {
                  const bizUsers = USERS.filter(
                    (u) => u.businessId === biz.id && !u.isSuperAdmin
                  );
                  const bizRoles = ROLES.filter((r) => r.businessId === biz.id);
                  return (
                    <TableRow key={biz.id}>
                      <TableCell className="font-medium">{biz.name}</TableCell>
                      <TableCell className="text-gray-600">{biz.type}</TableCell>
                      <TableCell className="text-gray-600">
                        {biz.enabledModules.length} / 12 modules
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {bizUsers.length} users
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {bizRoles.length} roles
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Users table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">All Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Access Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.filter((u) => !u.isSuperAdmin).map((u) => {
                  const biz = BUSINESSES.find((b) => b.id === u.businessId);
                  const role = ROLES.find((r) => r.id === u.roleId);
                  return (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-gray-600">{u.email}</TableCell>
                      <TableCell className="text-gray-600">
                        {biz?.name ?? "—"}
                      </TableCell>
                      <TableCell>
                        {u.isBusinessAdmin ? (
                          <Badge variant="default">Business Admin</Badge>
                        ) : (
                          <Badge variant="secondary">
                            {role?.name ?? "No Role"}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
