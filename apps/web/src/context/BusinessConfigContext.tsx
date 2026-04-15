"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  ALL_MODULES, BUSINESSES, ROLES as DEMO_ROLES, USERS as DEMO_USERS,
  Role, User, Permission,
} from "@/lib/demo-data";

type BusinessConfigContextType = {
  enabledModules: string[];
  roles: Role[];
  users: User[];
  toggleModule: (key: string) => void;
  updateRoles: (roles: Role[]) => void;
  updateUsers: (users: User[]) => void;
  getPermission: (moduleKey: string) => Permission;
};

const BusinessConfigContext = createContext<BusinessConfigContextType | null>(null);

export function BusinessConfigProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const businessId = user?.businessId ?? null;

  const [enabledModules, setEnabledModules] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!businessId) return;
    const biz = BUSINESSES.find((b) => b.id === businessId);

    const savedModules = localStorage.getItem(`bizdesk_modules_${businessId}`);
    setEnabledModules(
      savedModules ? JSON.parse(savedModules) : (biz?.enabledModules ?? [])
    );

    const savedRoles = localStorage.getItem(`bizdesk_roles_${businessId}`);
    setRoles(
      savedRoles
        ? JSON.parse(savedRoles)
        : DEMO_ROLES.filter((r) => r.businessId === businessId)
    );

    const savedUsers = localStorage.getItem(`bizdesk_users_${businessId}`);
    setUsers(
      savedUsers
        ? JSON.parse(savedUsers)
        : DEMO_USERS.filter((u) => u.businessId === businessId && !u.isBusinessAdmin)
    );
  }, [businessId]);

  function toggleModule(key: string) {
    if (!businessId) return;
    const next = enabledModules.includes(key)
      ? enabledModules.filter((m) => m !== key)
      : [...enabledModules, key];
    setEnabledModules(next);
    localStorage.setItem(`bizdesk_modules_${businessId}`, JSON.stringify(next));
  }

  function updateRoles(newRoles: Role[]) {
    if (!businessId) return;
    setRoles(newRoles);
    localStorage.setItem(`bizdesk_roles_${businessId}`, JSON.stringify(newRoles));
  }

  function updateUsers(newUsers: User[]) {
    if (!businessId) return;
    setUsers(newUsers);
    localStorage.setItem(`bizdesk_users_${businessId}`, JSON.stringify(newUsers));
  }

  function getPermission(moduleKey: string): Permission {
    if (!user) return "none";
    if (user.isBusinessAdmin) {
      return enabledModules.includes(moduleKey) ? "write" : "none";
    }
    if (!enabledModules.includes(moduleKey)) return "none";
    if (user.roleId) {
      // Check runtime roles first (may have been updated in settings)
      const role = roles.find((r) => r.id === user.roleId);
      if (role) return (role.permissions[moduleKey] as Permission) ?? "none";
    }
    return "none";
  }

  // Build full ALL_MODULES permission map for sidebar
  const _ = ALL_MODULES; // keep import used

  return (
    <BusinessConfigContext.Provider
      value={{ enabledModules, roles, users, toggleModule, updateRoles, updateUsers, getPermission }}
    >
      {children}
    </BusinessConfigContext.Provider>
  );
}

export function useBusinessConfig() {
  const ctx = useContext(BusinessConfigContext);
  if (!ctx) throw new Error("useBusinessConfig must be inside BusinessConfigProvider");
  return ctx;
}
