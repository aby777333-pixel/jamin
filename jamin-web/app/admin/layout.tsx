"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Handshake, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Client Leads", href: "/admin/clients", icon: Users },
  { name: "Broker Leads", href: "/admin/brokers", icon: Handshake },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Mobile Header */}
      <div className="flex h-16 items-center justify-between bg-[#1A1412] px-4 lg:hidden">
        <span className="font-['Cormorant_Garamond'] text-xl font-bold text-white">
          JAMIN Admin
        </span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-60 bg-[#1A1412] transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-white/10">
          <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-white">
            JAMIN
          </span>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 font-['Outfit'] transition-colors ${
                  isActive
                    ? "border-l-4 border-[#D42B2B] bg-white/5 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-['Outfit'] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-60">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
