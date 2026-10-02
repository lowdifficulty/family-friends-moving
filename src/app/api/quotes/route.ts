import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createQuoteLead, readLeads } from "@/lib/leads/store";
import type { QuoteFormData } from "@/lib/quote-flow";

function validateForm(form: QuoteFormData): string | null {
  if (!form.moveType) return "Move distance required";
  if (!form.homeType) return "Home type required";
  if (!form.roomType) return "Move size required";
  if (form.zipcode.length !== 5) return "Valid origin ZIP required";
  if (form.moveType === "Long Distance" && form.destinationZip.length !== 5) {
    return "Valid destination ZIP required";
  }
  if (!form.dateType) return "Move date preference required";
  if (
    (form.dateType === "Exact" || form.dateType === "Flexibile") &&
    !form.date
  ) {
    return "Move date required";
  }
  if (form.name.trim().length < 2) return "Name required";
  if (form.phone.replace(/\D/g, "").length !== 10) return "Valid phone required";
  return null;
}

export async function POST(request: Request) {
  const form = (await request.json()) as QuoteFormData;
  const err = validateForm(form);
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
  const lead = await createQuoteLead(form);
  return NextResponse.json({ success: true, id: lead.id });
}

export async function GET() {
  const session = await getSession();
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await readLeads();
  return NextResponse.json(data);
}
