"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  GraduationCap,
  BookOpen,
  BookMarked,
  Music,
  ClipboardList,
  Calendar,
  Mic,
  Heart,
  Package,
  CalendarCheck,
  Wrench,
} from "lucide-react";

const NAV = [
  {
    group: "People",
    items: [
      { label: "Staff", href: "/staff", icon: Users },
      { label: "Students", href: "/students", icon: GraduationCap },
    ],
  },
  {
    group: "Programs",
    items: [
      { label: "Classes", href: "/classes", icon: BookOpen },
      { label: "Courses", href: "/courses", icon: BookMarked },
      { label: "Private Lessons", href: "/private-lessons", icon: Music },
      { label: "Enrollments", href: "/enrollments", icon: ClipboardList },
    ],
  },
  {
    group: "Events",
    items: [
      { label: "Events", href: "/events", icon: Calendar },
      { label: "Conferences", href: "/conferences", icon: Mic },
      { label: "Fundraising", href: "/fundraising", icon: Heart },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Products", href: "/products", icon: Package },
      { label: "Reservations", href: "/reservations", icon: CalendarCheck },
      { label: "Tools", href: "/tools", icon: Wrench },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">BizDesk</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
              {section.group}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
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
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          BizDesk &copy; {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
