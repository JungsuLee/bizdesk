"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getFirstAccessibleRoute } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DEMO_ACCOUNTS = [
  { email: "superadmin@bizdesk.com", label: "Super Admin (Platform)", role: "Platform Owner" },
  { email: "admin@musicschool.com", label: "Music School NYC", role: "Business Admin" },
  { email: "instructor@musicschool.com", label: "Music School NYC", role: "Senior Instructor" },
  { email: "frontdesk@musicschool.com", label: "Music School NYC", role: "Front Desk" },
  { email: "admin@yogastudio.com", label: "Yoga Studio LA", role: "Business Admin" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Invalid credentials.");
      return;
    }
    router.replace(getFirstAccessibleRoute(result.user!));
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("demo1234");
    setError("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">BizDesk</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Login form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Welcome back</CardTitle>
            <CardDescription>Enter your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo accounts */}
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500">
              Demo Accounts — click to fill
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => fillDemo(acc.email)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-700">{acc.email}</p>
                    <p className="text-xs text-gray-400">{acc.label}</p>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    {acc.role}
                  </span>
                </div>
              </button>
            ))}
            <p className="text-xs text-gray-400 pt-1 text-center">
              All passwords: <code className="font-mono bg-gray-100 px-1 rounded">demo1234</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
