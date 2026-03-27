import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Access your exclusive account and continue shopping"
      footer={
        <>
          New to Elite?{" "}
          <Link href="/signUp" className="font-semibold text-[#7c3aed] hover:text-[#6d28d9] transition">
            Create account
          </Link>
        </>
      }
      sidebarContent={
        <div className="flex flex-col justify-end space-y-6 mt-auto">
          <div className="space-y-4 pb-6 border-t border-white/10 pt-6">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#7c3aed] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="font-medium text-white text-sm mb-1">Premium Member</p>
                <p className="text-white/60 text-xs">Unlock exclusive deals and early access</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#7c3aed] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <div>
                <p className="font-medium text-white text-sm mb-1">Free Shipping</p>
                <p className="text-white/60 text-xs">On orders over $100 worldwide</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#7c3aed] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-white text-sm mb-1">Secure & Safe</p>
                <p className="text-white/60 text-xs">Your payments and data are protected</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}