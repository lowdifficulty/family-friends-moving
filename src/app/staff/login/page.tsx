import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Staff Login | Family Friends Moving",
  robots: { index: false, follow: false },
};

export default function StaffLoginPage() {
  return (
    <LoginForm
      role="staff"
      title="Staff login"
      subtitle="Sign in to view incoming quote requests."
      dashboardPath="/staff/dashboard"
    />
  );
}
