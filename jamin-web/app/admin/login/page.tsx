"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password === "jamin2025") {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Invalid password");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1412]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center">
          <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#D42B2B]">
            JAMIN
          </span>
          <span className="ml-1 font-['Cinzel'] text-sm text-[#1A1412]">
            Properties
          </span>
        </Link>

        <h2 className="mt-8 text-center font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1A1412]">
          Admin Login
        </h2>
        <p className="mt-2 text-center font-['Outfit'] text-sm text-[#8A8078]">
          Enter your password to access the CRM
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 pr-12 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8078]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center font-['Outfit'] text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#D42B2B] py-3 font-['Outfit'] font-semibold text-white transition-colors hover:bg-[#B02020] disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="font-['Outfit'] text-sm text-[#8A8078] hover:text-[#D42B2B]"
          >
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
