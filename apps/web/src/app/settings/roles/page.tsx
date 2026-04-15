"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useBusinessConfig } from "@/context/BusinessConfigContext";
import { ALL_MODULES, Role } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function RolesPage() {
  const { user } = useAuth();
  const { roles, updateRoles } = useBusinessConfig();
  const [open, setOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  function handleCreate() {
    if (!newRoleName.trim() || !user?.businessId) return;
    const newRole: Role = {
      id: `role-${Date.now()}`,
      businessId: user.businessId,
      name: newRoleName.trim(),
      permissions: Object.fromEntries(ALL_MODULES.map((m) => [m.key, "none"])) as Role["permissions"],
    };
    updateRoles([...roles, newRole]);
    setNewRoleName("");
    setOpen(false);
  }

  function handleDelete(roleId: string) {
    updateRoles(roles.filter((r) => r.id !== roleId));
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create roles and set per-tab permissions for your team.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Create Role</Button>
      </div>

      <div className="bg-white rounded-lg border divide-y">
        {roles.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No roles yet. Create one to get started.
          </p>
        )}
        {roles.map((role) => {
          const writeCount = Object.values(role.permissions).filter((p) => p === "write").length;
          const readCount = Object.values(role.permissions).filter((p) => p === "read").length;
          return (
            <div key={role.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{role.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default" className="text-xs">{writeCount} write</Badge>
                  <Badge variant="secondary" className="text-xs">{readCount} read</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/settings/roles/${role.id}`}>
                  <Button size="sm" variant="outline">Edit Permissions</Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-1 py-2">
            <Label>Role Name</Label>
            <Input
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="e.g. Senior Instructor, Front Desk"
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
