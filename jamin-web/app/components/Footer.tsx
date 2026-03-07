"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  navigate: [
    { name: "Properties", href: "#properties" },
    { name: "Why Land", href: "#why-land" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ],
  contact: [
    { name: "+91 98765 43210", href: "tel:+919876543210" },
    { name: "info@jaminproperties.com", href: "mailto:info@jaminproperties.com" },
    { name: "Chat on WhatsApp", href: "https://wa.me/919876543210" },
  ],
  states: [
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Gujarat",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F0A0A] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Column 1 - Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-40">
                <Image
                  src="/logo.png"
                  alt="Jamin Properties"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 font-['Outfit'] text-sm text-white/60">
              India&apos;s premium land investment platform. Verified opportunities. Transparent process. Secure investments.
            </p>
            <p className="mt-4 font-['Cinzel'] text-sm text-[#F5A623]">
              signature for Fortune
            </p>
          </div>

          {/* Column 2 - Navigate */}
          <div>
            <h4 className="font-['Outfit'] text-sm font-semibold uppercase tracking-wider text-white">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.navigate.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-['Outfit'] text-sm text-white/60 transition-colors hover:text-[#F5A623]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="font-['Outfit'] text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-['Outfit'] text-sm text-white/60 transition-colors hover:text-[#F5A623]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - States */}
          <div>
            <h4 className="font-['Outfit'] text-sm font-semibold uppercase tracking-wider text-white">
              States We Serve
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {footerLinks.states.map((state) => (
                <li key={state}>
                  <span className="font-['Outfit'] text-sm text-white/60">
                    {state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-['Outfit'] text-sm text-white/60">
              © 2025 Jamin Properties. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="font-['Outfit'] text-xs text-white/40 hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-['Outfit'] text-xs text-white/40 hover:text-white"
              >
                Terms of Use
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#F5A623] hover:text-[#0F0A0A]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#F5A623] hover:text-[#0F0A0A]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#F5A623] hover:text-[#0F0A0A]"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          <p className="mt-4 text-center font-['Outfit'] text-[11px] text-white/30">
            Land investment is subject to market risks. Please read all documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}
