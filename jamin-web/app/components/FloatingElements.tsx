"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingElements() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("client-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed left-0 right-0 top-0 z-[9999] h-[2.5px] origin-left bg-gradient-to-r from-[#D42B2B] to-[#F5A623]"
        style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: "left" }}
      />

      {/* Floating Buttons */}
      <div
        className={`fixed bottom-8 right-8 z-50 flex flex-col gap-3 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20Jamin%20Properties."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#25D366] px-4 py-2 font-['Outfit'] text-sm font-medium text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </a>

        {/* Contact Button */}
        <button
          onClick={scrollToForm}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D42B2B] text-white shadow-lg transition-transform hover:scale-110"
        >
          <Phone size={24} />
          <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#D42B2B] px-4 py-2 font-['Outfit'] text-sm font-medium text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Talk to Us
          </span>
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#D42B2B]" />
        </button>
      </div>
    </>
  );
}
