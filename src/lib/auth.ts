import "server-only";

import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "staff";

export interface SessionUser {
  role: UserRole;
  displayName: string;
}

export interface SessionData {
  user?: SessionUser;
}

const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ??
    "family-friends-moving-dev-secret-change-in-production-32chars",
  cookieName: "ffm_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

function adminCredentials() {
  return {
    username: (process.env.ADMIN_USERNAME ?? "admin").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD ?? "family123",
  };
}

function staffCredentials() {
  return {
    username: (process.env.STAFF_USERNAME ?? "staff").trim().toLowerCase(),
    password: process.env.STAFF_PASSWORD ?? "family123",
  };
}

export async function loginAdmin(username: string, password: string): Promise<SessionUser | null> {
  const creds = adminCredentials();
  if (username.trim().toLowerCase() !== creds.username) return null;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    const ok = await bcrypt.compare(password, hash);
    if (!ok) return null;
  } else if (password !== creds.password) {
    return null;
  }
  return { role: "admin", displayName: "Admin" };
}

export async function loginStaff(username: string, password: string): Promise<SessionUser | null> {
  const creds = staffCredentials();
  if (username.trim().toLowerCase() !== creds.username) return null;
  const hash = process.env.STAFF_PASSWORD_HASH;
  if (hash) {
    const ok = await bcrypt.compare(password, hash);
    if (!ok) return null;
  } else if (password !== creds.password) {
    return null;
  }
  return { role: "staff", displayName: "Staff" };
}
