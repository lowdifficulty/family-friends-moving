import type { QuoteFormData } from "@/lib/quote-flow";

export type LeadStatus = "new" | "contacted" | "booked" | "closed";

export interface QuoteLead {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  form: QuoteFormData;
  notes: string;
}

export interface LeadsData {
  leads: QuoteLead[];
}

export type QuoteLeadInput = Omit<QuoteFormData, never>;
