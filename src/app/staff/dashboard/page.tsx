import { redirect } from "next/navigation";
import LeadsPanel from "@/components/LeadsPanel";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Staff Dashboard | Family Friends Moving",
  robots: { index: false, follow: false },
};

export default async function StaffDashboardPage() {
  const session = await getSession();
  if (!session.user) {
    redirect("/staff/login");
  }
  return <LeadsPanel role="staff" />;
}
