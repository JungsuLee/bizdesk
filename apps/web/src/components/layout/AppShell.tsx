"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BusinessConfigProvider } from "@/context/BusinessConfigContext";
import { Sidebar } from "./Sidebar";

const PUBLIC = ["/login"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isPublic = PUBLIC.includes(pathname);
  const isSuperAdmin = pathname.startsWith("/superadmin");

  useEffect(() => {
    if (loading) return;
    if (!user && !isPublic) { router.replace("/login"); return; }
    if (user && isPublic) {
      router.replace(user.isSuperAdmin ? "/superadmin" : "/staff");
      return;
    }
    if (user?.isSuperAdmin && !isSuperAdmin && !isPublic) {
      router.replace("/superadmin");
    }
    if (user && !user.isSuperAdmin && isSuperAdmin) {
      router.replace("/staff");
    }
  }, [user, loading, isPublic, isSuperAdmin, pathname, router]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Public pages (login)
  if (isPublic) return <>{children}</>;

  // Not authed yet (redirecting)
  if (!user) return null;

  // Super admin – no sidebar
  if (isSuperAdmin) return <>{children}</>;

  // Business dashboard
  return (
    <BusinessConfigProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </BusinessConfigProvider>
  );
}
