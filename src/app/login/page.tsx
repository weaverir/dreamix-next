import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
      <AuthLayout title="ورود به حساب">
        <LoginForm />
      </AuthLayout>
  );
}
