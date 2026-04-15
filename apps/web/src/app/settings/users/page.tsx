"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useBusinessConfig } from "@/context/BusinessConfigContext";
import { User } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EMPTY_FORM: { name: string; email: string; password: string; roleId: string } = { name: "", email: "", password: "", roleId: "" };

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const { users, roles, updateUsers } = useBusinessConfig();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function openAdd() {
    setEditingUser(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(u: User) {
    setEditingUser(u);
    setForm({ name: u.name, email: u.email, password: u.password, roleId: u.roleId ?? "" });
    setOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.email || !currentUser?.businessId) return;
    if (editingUser) {
      updateUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: form.name, email: form.email, password: form.password || u.password, roleId: form.roleId || null }
            : u
        )
      );
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: form.name,
        email: form.email,
        password: form.password || "demo1234",
        businessId: currentUser.businessId,
        roleId: form.roleId || null,
        isSuperAdmin: false,
        isBusinessAdmin: false,
      };
      updateUsers([...users, newUser]);
    }
    setOpen(false);
  }

  function handleDelete(userId: string) {
    updateUsers(users.filter((u) => u.id !== userId));
  }

  function getRoleName(roleId: string | null) {
    if (!roleId) return "—";
    return roles.find((r) => r.id === roleId)?.name ?? "Unknown";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage team members and their roles.
          </p>
        </div>
        <Button onClick={openAdd}>+ Add User</Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                  No users yet. Add one to get started.
                </TableCell>
              </TableRow>
            )}
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-gray-600">{u.email}</TableCell>
                <TableCell className="text-gray-600">{getRoleName(u.roleId)}</TableCell>
                <TableCell>
                  {u.isBusinessAdmin ? (
                    <Badge>Admin</Badge>
                  ) : u.roleId ? (
                    <Badge variant="secondary">Custom Role</Badge>
                  ) : (
                    <Badge variant="outline">No Role</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(u)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Maria Santos" />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@company.com" />
            </div>
            <div className="space-y-1">
              <Label>Password {editingUser && <span className="text-gray-400">(leave blank to keep current)</span>}</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <Select value={form.roleId ?? ""} onValueChange={(v) => setForm({ ...form, roleId: v as string })}>
                <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Role</SelectItem>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingUser ? "Save Changes" : "Add User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
