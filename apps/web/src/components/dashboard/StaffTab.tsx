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
import { StaffRow } from "./types";

const INITIAL_STAFF: StaffRow[] = [
  {
    id: "1",
    name: "David Kim",
    email: "david@bizdesk.com",
    role: "Manager",
    department: "Operations",
    status: "Active",
    startDate: "2022-03-01",
  },
  {
    id: "2",
    name: "Emma Davis",
    email: "emma@bizdesk.com",
    role: "Sales Rep",
    department: "Sales",
    status: "Active",
    startDate: "2023-06-15",
  },
  {
    id: "3",
    name: "Frank Lee",
    email: "frank@bizdesk.com",
    role: "Support",
    department: "Customer Service",
    status: "On Leave",
    startDate: "2023-09-01",
  },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  role: "",
  department: "",
  status: "Active" as StaffRow["status"],
};

const STATUS_COLORS: Record<StaffRow["status"], "default" | "secondary" | "outline"> = {
  Active: "default",
  "On Leave": "secondary",
  Inactive: "outline",
};

export function StaffTab() {
  const [staff, setStaff] = useState<StaffRow[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffRow | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditingStaff(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(member: StaffRow) {
    setEditingStaff(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      department: member.department,
      status: member.status,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.email) return;
    if (editingStaff) {
      setStaff((prev) =>
        prev.map((s) => (s.id === editingStaff.id ? { ...s, ...form } : s))
      );
    } else {
      const newMember: StaffRow = {
        id: Date.now().toString(),
        ...form,
        startDate: new Date().toISOString().split("T")[0],
      };
      setStaff((prev) => [...prev, newMember]);
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name, role, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={openAdd}>+ Add Staff</Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                  No staff members found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="text-gray-600">{member.email}</TableCell>
                  <TableCell className="text-gray-600">{member.role}</TableCell>
                  <TableCell className="text-gray-600">{member.department}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_COLORS[member.status]}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{member.startDate}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(member.id)}
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
              {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
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
                placeholder="email@company.com"
              />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Manager, Sales Rep"
              />
            </div>
            <div className="space-y-1">
              <Label>Department</Label>
              <Input
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                placeholder="e.g. Sales, Operations"
              />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({ ...form, status: v as StaffRow["status"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
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
              {editingStaff ? "Save Changes" : "Add Staff Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
