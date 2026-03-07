"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Properties", href: "#properties" },
  { name: "Why Land", href: "#why-land" },
  { name: "About", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#D42B2B]">
                JAMIN
              </span>
              <span className="ml-1 font-['Cinzel'] text-sm text-[#1A1412]">
                Properties
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-['Outfit'] text-[15px] font-medium text-[#1A1412] transition-colors hover:text-[#D42B2B]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20Jamin%20Properties."
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110"
              >
                <MessageCircle size={20} />
              </a>
              <Link
                href="#client-form"
                className="rounded-full bg-[#D42B2B] px-5 py-2 font-['Outfit'] text-sm font-semibold text-white transition-colors hover:bg-[#B02020]"
              >
                Enquire Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="text-[#1A1412]" size={24} />
              ) : (
                <Menu className="text-[#1A1412]" size={24} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-[72px] md:hidden"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-['Outfit'] text-xl font-medium text-[#1A1412]"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#client-form"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 rounded-full bg-[#D42B2B] px-8 py-3 font-['Outfit'] font-semibold text-white"
              >
                Enquire Now
              </Link>
              <a
                href="https://wa.me/919876543210"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-['Outfit'] font-semibold text-white"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
