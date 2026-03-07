"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="section-py bg-[#FDFAF5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left - Contact Details */}
          <div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1412] md:text-5xl">
              Get In Touch
            </h2>

            <div className="mt-8 space-y-6">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF8EC]">
                  <Phone className="h-5 w-5 text-[#F5A623]" />
                </div>
                <div>
                  <p className="font-['Outfit'] text-sm text-[#8A8078]">Call Us</p>
                  <p className="font-['Outfit'] text-lg font-semibold text-[#1A1412]">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@jaminproperties.com"
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF8EC]">
                  <Mail className="h-5 w-5 text-[#F5A623]" />
                </div>
                <div>
                  <p className="font-['Outfit'] text-sm text-[#8A8078]">Email Us</p>
                  <p className="font-['Outfit'] text-lg font-semibold text-[#1A1412]">
                    info@jaminproperties.com
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-['Outfit'] text-sm text-[#8A8078]">WhatsApp</p>
                  <p className="font-['Outfit'] text-lg font-semibold text-[#1A1412]">
                    Chat on WhatsApp
                  </p>
                </div>
              </a>

              {/* Office Address */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF8EC]">
                  <MapPin className="h-5 w-5 text-[#F5A623]" />
                </div>
                <div>
                  <p className="font-['Outfit'] text-sm text-[#8A8078]">Office Address</p>
                  <p className="font-['Outfit'] text-lg font-semibold text-[#1A1412]">
                    123 Business Park, Floor 3<br />
                    Chennai, Tamil Nadu 600001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Quick Contact Form */}
          <div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl bg-white p-8 shadow-lg"
          >
            <h3 className="font-['Outfit'] text-xl font-semibold text-[#1A1412]">
              Quick Inquiry
            </h3>
            <p className="mt-2 font-['Outfit'] text-[#8A8078]">
              Get a call back within 2 hours
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  placeholder="Your Message"
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D42B2B] py-4 font-['Outfit'] text-base font-semibold text-white transition-colors hover:bg-[#B02020]"
              >
                Send Message
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
