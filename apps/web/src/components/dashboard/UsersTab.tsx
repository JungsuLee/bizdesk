"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRow } from "./types";

const INITIAL_USERS: UserRow[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-0101",
    status: "Active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "555-0102",
    status: "Active",
    joinedAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    phone: "555-0103",
    status: "Inactive",
    joinedAt: "2023-11-05",
  },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  status: "Active" as UserRow["status"],
};

export function UsersTab() {
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditingUser(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(user: UserRow) {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.email) return;
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u))
      );
    } else {
      const newUser: UserRow = {
        id: Date.now().toString(),
        ...form,
        joinedAt: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={openAdd}>+ Add Customer</Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-gray-600">{user.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "default" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.joinedAt}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit Customer" : "Add New Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="555-0000"
              />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({ ...form, status: v as UserRow["status"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingUser ? "Save Changes" : "Add Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
