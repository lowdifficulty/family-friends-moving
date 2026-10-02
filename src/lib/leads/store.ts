import "server-only";

import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import type { LeadStatus, LeadsData, QuoteLead, QuoteLeadInput } from "./types";

const FILE_PATH = path.join(process.cwd(), "data", "leads.json");
const REDIS_KEY = "ffm:leads";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function emptyData(): LeadsData {
  return { leads: [] };
}

async function readFile(): Promise<LeadsData> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as LeadsData;
    return { leads: parsed.leads ?? [] };
  } catch {
    return emptyData();
  }
}

async function writeFile(data: LeadsData): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function readLeads(): Promise<LeadsData> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<LeadsData>(REDIS_KEY);
    return data ? { leads: data.leads ?? [] } : emptyData();
  }
  if (process.env.VERCEL) {
    return emptyData();
  }
  return readFile();
}

async function writeLeads(data: LeadsData): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_KEY, data);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN on Vercel.");
  }
  await writeFile(data);
}

export async function createQuoteLead(form: QuoteLeadInput): Promise<QuoteLead> {
  const data = await readLeads();
  const now = new Date().toISOString();
  const lead: QuoteLead = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    form,
    notes: "",
  };
  data.leads.unshift(lead);
  await writeLeads(data);
  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  notes?: string
): Promise<QuoteLead | null> {
  const data = await readLeads();
  const idx = data.leads.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  data.leads[idx] = {
    ...data.leads[idx],
    status,
    notes: notes ?? data.leads[idx].notes,
    updatedAt: new Date().toISOString(),
  };
  await writeLeads(data);
  return data.leads[idx];
}
