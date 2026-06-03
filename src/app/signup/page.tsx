import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    return (
        <AuthLayout title="ساخت حساب جدید">
            <SignupForm />
        </AuthLayout>
    );
}
