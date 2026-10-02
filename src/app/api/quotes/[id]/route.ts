import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateLeadStatus } from "@/lib/leads/store";
import type { LeadStatus } from "@/lib/leads/types";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { status?: LeadStatus; notes?: string };
  if (!body.status) {
    return NextResponse.json({ error: "Status required" }, { status: 400 });
  }

  const updated = await updateLeadStatus(id, body.status, body.notes);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
