"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeadStatus, QuoteLead } from "@/lib/leads/types";

const STATUSES: LeadStatus[] = ["new", "contacted", "booked", "closed"];

export default function LeadsPanel({ role }: { role: "admin" | "staff" }) {
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/quotes");
    setLoading(false);
    if (!res.ok) {
      setError("Could not load leads.");
      return;
    }
    const data = (await res.json()) as { leads: QuoteLead[] };
    setLeads(data.leads ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: LeadStatus) {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) load();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = role === "admin" ? "/admin/login" : "/staff/login";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-ffm-orange font-semibold uppercase">Family Friends Moving</p>
            <h1 className="text-xl font-bold text-ffm-navy">
              {role === "admin" ? "Admin" : "Staff"} — Quote leads
            </h1>
          </div>
          <button type="button" onClick={logout} className="text-sm text-slate-600 hover:text-ffm-navy">
            Sign out
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && <p className="text-sm text-slate-600">Loading…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && leads.length === 0 && (
          <p className="text-sm text-slate-600">No quote requests yet.</p>
        )}
        <div className="space-y-4">
          {leads.map((lead) => (
            <article key={lead.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ffm-navy">{lead.form.name || "Unknown"}</p>
                  <p className="text-sm text-slate-600">{lead.form.phone}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
                <select
                  className="portal-input py-1 text-sm w-auto"
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <dl className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-slate-500">Move distance</dt>
                  <dd>{lead.form.moveType}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Home type</dt>
                  <dd>{lead.form.homeType}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Size</dt>
                  <dd>{lead.form.roomType}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">From ZIP</dt>
                  <dd>{lead.form.zipcode}</dd>
                </div>
                {lead.form.destinationZip && (
                  <div>
                    <dt className="text-slate-500">To ZIP</dt>
                    <dd>{lead.form.destinationZip}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-slate-500">Move date</dt>
                  <dd>
                    {lead.form.dateType}
                    {lead.form.date ? ` · ${lead.form.date}` : ""}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
