import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Admin Login | Family Friends Moving",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <LoginForm
      role="admin"
      title="Admin login"
      subtitle="Sign in to view quote leads and update customer status."
      dashboardPath="/admin/dashboard"
    />
  );
}
