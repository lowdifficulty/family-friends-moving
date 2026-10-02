import { redirect } from "next/navigation";
import LeadsPanel from "@/components/LeadsPanel";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard | Family Friends Moving",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }
  return <LeadsPanel role="admin" />;
}
