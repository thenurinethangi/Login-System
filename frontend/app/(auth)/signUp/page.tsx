import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Join Elite"
      subtitle="Create an account to start shopping and enjoy exclusive benefits"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/signIn" className="font-semibold text-[#7c3aed] hover:text-[#6d28d9] transition">
            Sign in
          </Link>
        </>
      }
      sidebarContent={
        <div className="flex flex-col justify-end space-y-6 mt-auto">
          <div className="space-y-4 pb-6 border-t border-white/10 pt-6">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#7c3aed] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-white text-sm mb-1">Welcome Bonus</p>
                <p className="text-white/60 text-xs">Get 15% off your first purchase</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#7c3aed] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="font-medium text-white text-sm mb-1">Easy Checkout</p>
                <p className="text-white/60 text-xs">Multiple payment options available</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#7c3aed] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="font-medium text-white text-sm mb-1">Fast Delivery</p>
                <p className="text-white/60 text-xs">Track your orders in real-time</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
