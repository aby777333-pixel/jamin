"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Acres Sold" },
  { value: "12", label: "States" },
  { value: "2,000+", label: "Happy Investors" },
  { value: "8", label: "Years Experience" },
];

function CountUp({ end, duration = 2000, suffix = "" }: { end: string; duration?: number; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    const numEnd = parseInt(end.replace(/[^0-9]/g, ""));
    const hasPlus = end.includes("+");
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numEnd * easeOut);
      
      setCount(current.toLocaleString() + (hasPlus ? "+" : ""));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            India&apos;s Premium Land Investment Platform
          </p>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 font-['Cormorant_Garamond'] text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Invest in Land.
          <br />
          <span className="font-semibold">Build Legacy.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl font-['Outfit'] text-lg text-white/70 md:text-xl"
        >
          India&apos;s finest verified land opportunities.
          <br className="hidden md:block" />
          Waiting for the right investor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="#client-form"
            className="group flex items-center gap-2 rounded-full bg-[#D42B2B] px-10 py-4 font-['Outfit'] text-base font-semibold text-white transition-all hover:bg-[#B02020] hover:shadow-lg"
          >
            Submit Inquiry
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#F5A623] md:text-5xl">
                <CountUp end={stat.value} />
              </div>
              <div className="mt-1 font-['Outfit'] text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
