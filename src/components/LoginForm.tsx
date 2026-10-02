"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({
  role,
  title,
  subtitle,
  dashboardPath,
}: {
  role: "admin" | "staff";
  title: string;
  subtitle: string;
  dashboardPath: string;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, username, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Login failed");
      return;
    }
    router.push(dashboardPath);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-md w-full mx-auto px-4 py-16 flex-1">
        <Link href="/" className="text-sm text-ffm-navy hover:underline">
          ← Back to website
        </Link>
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <p className="text-xs uppercase tracking-wider text-ffm-orange font-semibold">
            Family Friends Moving
          </p>
          <h1 className="text-2xl font-bold text-ffm-navy mt-1">{title}</h1>
          <p className="text-sm text-slate-600 mt-2 mb-6">{subtitle}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                className="portal-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                className="portal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="ffm-btn-primary w-full">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
