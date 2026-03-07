"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Acres Sold" },
  { value: "12", label: "States" },
  { value: "2,000+", label: "Happy Investors" },
  { value: "8", label: "Years Experience" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
          alt="Indian farmland landscape"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1412]/70 via-[#1A1412]/60 to-[#1A1412]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Pre-heading */}
        <div>
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            India&apos;s Premium Land Investment Platform
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 font-['Cormorant_Garamond'] text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl">
          Invest in Land.
          <br />
          <span className="font-semibold">Build Legacy.</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 font-['Outfit'] text-lg text-white/70 md:text-xl">
          India&apos;s finest verified land opportunities.
          <br className="hidden md:block" />
          Waiting for the right investor.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#client-form"
            className="flex items-center gap-2 rounded-full bg-[#D42B2B] px-10 py-4 font-['Outfit'] text-base font-semibold text-white transition-all hover:bg-[#B02020] hover:shadow-lg"
          >
            Submit Inquiry
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20Jamin%20Properties."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#F5A623] px-10 py-4 font-['Outfit'] text-base font-semibold text-[#1A1412] transition-all hover:bg-[#D4891A] hover:shadow-lg"
          >
            <MessageCircle size={20} />
            WhatsApp Us
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#F5A623] md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1 font-['Outfit'] text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
