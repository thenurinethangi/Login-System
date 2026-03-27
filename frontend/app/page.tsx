'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function HomeContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/signIn');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <h1 className="text-6xl lg:text-7xl font-bold text-[#1f2937] mb-6">
          Welcome Home
        </h1>
        <p className="text-2xl text-[#6b7280] max-w-2xl">
          You're successfully logged in. Ready to explore?
        </p>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}
