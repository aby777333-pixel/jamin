"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "./data";

export default function Testimonials() {
  return (
    <section className="section-py bg-[#FFF8EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            Investor Stories
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-center font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1412] md:text-5xl"
        >
          What Our Investors Say
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 font-['Cormorant_Garamond'] text-lg italic text-[#1A1412]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-['Outfit'] font-semibold text-[#1A1412]">
                    {testimonial.name}
                  </p>
                  <p className="font-['Outfit'] text-sm text-[#8A8078]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
