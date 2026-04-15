"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, Business, BUSINESSES, findUserByEmail } from "@/lib/demo-data";

type AuthContextType = {
  user: User | null;
  business: Business | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bizdesk_session");
    if (saved) {
      const u: User = JSON.parse(saved);
      setUser(u);
      if (u.businessId) {
        setBusiness(BUSINESSES.find((b) => b.id === u.businessId) ?? null);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // 1. Check hardcoded demo users
    let u: User | undefined = findUserByEmail(email);

    // 2. Check localStorage users added via Settings → Users
    if (!u) {
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith("bizdesk_users_")
      );
      for (const key of keys) {
        const list: User[] = JSON.parse(localStorage.getItem(key) || "[]");
        const found = list.find(
          (usr) => usr.email.toLowerCase() === email.toLowerCase()
        );
        if (found) { u = found; break; }
      }
    }

    if (!u || u.password !== password) {
      return { success: false, error: "Invalid email or password." };
    }

    setUser(u);
    if (u.businessId) {
      setBusiness(BUSINESSES.find((b) => b.id === u.businessId) ?? null);
    }
    localStorage.setItem("bizdesk_session", JSON.stringify(u));
    return { success: true, user: u };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setBusiness(null);
    localStorage.removeItem("bizdesk_session");
  }, []);

  return (
    <AuthContext.Provider value={{ user, business, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
