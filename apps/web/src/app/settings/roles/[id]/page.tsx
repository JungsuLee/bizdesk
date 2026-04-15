"use client";

import { useParams, useRouter } from "next/navigation";
import { useBusinessConfig } from "@/context/BusinessConfigContext";
import { ALL_MODULES, Permission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const PERMISSION_OPTIONS: { value: Permission; label: string; color: string }[] = [
  { value: "none",  label: "No Access", color: "text-gray-400" },
  { value: "read",  label: "Read Only", color: "text-amber-600" },
  { value: "write", label: "Full Access", color: "text-blue-600" },
];

export default function RoleEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { roles, updateRoles } = useBusinessConfig();
  const roleId = params.id as string;

  const role = roles.find((r) => r.id === roleId);

  const [name, setName] = useState(role?.name ?? "");
  const [permissions, setPermissions] = useState<Record<string, Permission>>(
    role?.permissions ?? {}
  );

  useEffect(() => {
    if (role) {
      setName(role.name);
      setPermissions(role.permissions);
    }
  }, [role]);

  if (!role) {
    return (
      <div className="text-center py-16 text-gray-400">
        Role not found.{" "}
        <button className="text-blue-600 underline" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    );
  }

  function setPermission(moduleKey: string, value: Permission) {
    setPermissions((prev) => ({ ...prev, [moduleKey]: value }));
  }

  function handleSave() {
    const updated = roles.map((r) =>
      r.id === roleId ? { ...r, name, permissions } : r
    );
    updateRoles(updated);
    router.push("/settings/roles");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Role</h1>
          <p className="text-sm text-gray-500 mt-1">
            Set which tabs this role can access and whether they can edit data.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      {/* Role name */}
      <div className="bg-white rounded-lg border p-5 space-y-2">
        <label className="text-sm font-medium text-gray-700">Role Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Senior Instructor"
        />
      </div>

      {/* Permission grid */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 border-b px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span className="col-span-1">Module</span>
          {PERMISSION_OPTIONS.map((o) => (
            <span key={o.value} className="text-center">{o.label}</span>
          ))}
        </div>
        <div className="divide-y">
          {ALL_MODULES.map((mod) => {
            const current = permissions[mod.key] ?? "none";
            return (
              <div
                key={mod.key}
                className="grid grid-cols-4 px-5 py-3.5 items-center hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-800">{mod.label}</span>
                {PERMISSION_OPTIONS.map((opt) => (
                  <div key={opt.value} className="flex justify-center">
                    <button
                      onClick={() => setPermission(mod.key, opt.value)}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        current === opt.value
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {current === opt.value && (
                        <span className="block w-2 h-2 rounded-full bg-white mx-auto" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
