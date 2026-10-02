import { NextResponse } from "next/server";
import { getSession, loginAdmin, loginStaff } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    role?: string;
    username?: string;
    password?: string;
  };

  if (!body.password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  let user = null;
  if (body.role === "admin") {
    if (!body.username?.trim()) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }
    user = await loginAdmin(body.username, body.password);
  } else if (body.role === "staff") {
    if (!body.username?.trim()) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }
    user = await loginStaff(body.username, body.password);
  } else {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await getSession();
  session.user = user;
  await session.save();

  return NextResponse.json({ success: true, user });
}
