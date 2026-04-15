"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users, GraduationCap, BookOpen, BookMarked, Music,
  ClipboardList, Calendar, Mic, Heart, Package,
  CalendarCheck, Wrench, Settings, LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBusinessConfig } from "@/context/BusinessConfigContext";

const NAV_GROUPS = [
  {
    group: "People",
    items: [
      { key: "staff", label: "Staff", href: "/staff", icon: Users },
      { key: "students", label: "Students", href: "/students", icon: GraduationCap },
    ],
  },
  {
    group: "Programs",
    items: [
      { key: "classes", label: "Classes", href: "/classes", icon: BookOpen },
      { key: "courses", label: "Courses", href: "/courses", icon: BookMarked },
      { key: "private-lessons", label: "Private Lessons", href: "/private-lessons", icon: Music },
      { key: "enrollments", label: "Enrollments", href: "/enrollments", icon: ClipboardList },
    ],
  },
  {
    group: "Events",
    items: [
      { key: "events", label: "Events", href: "/events", icon: Calendar },
      { key: "conferences", label: "Conferences", href: "/conferences", icon: Mic },
      { key: "fundraising", label: "Fundraising", href: "/fundraising", icon: Heart },
    ],
  },
  {
    group: "Operations",
    items: [
      { key: "products", label: "Products", href: "/products", icon: Package },
      { key: "reservations", label: "Reservations", href: "/reservations", icon: CalendarCheck },
      { key: "tools", label: "Tools", href: "/tools", icon: Wrench },
    ],
  },
];

const SETTINGS_ITEMS = [
  { label: "Modules", href: "/settings/modules" },
  { label: "Roles", href: "/settings/roles" },
  { label: "Users", href: "/settings/users" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, business, logout } = useAuth();
  const { getPermission } = useBusinessConfig();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  const isSettings = pathname.startsWith("/settings");

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo + Business */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight truncate">
              {business?.name ?? "BizDesk"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_GROUPS.map((section) => {
          const visibleItems = section.items.filter(
            (item) => getPermission(item.key) !== "none"
          );
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.group}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                {section.group}
              </p>
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const perm = getPermission(item.key);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={15} />
                        {item.label}
                      </span>
                      {perm === "read" && (
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${isActive ? "bg-blue-500 text-blue-100" : "bg-gray-100 text-gray-400"}`}>
                          Read
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Settings — business admin only */}
        {user?.isBusinessAdmin && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
              Settings
            </p>
            <div className="space-y-0.5">
              {SETTINGS_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href === "/settings/roles" && pathname.startsWith("/settings/roles"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Settings size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
