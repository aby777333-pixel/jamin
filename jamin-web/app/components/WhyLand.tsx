"use client";

import { benefits } from "./data";

export default function WhyLand() {
  return (
    <section id="why-land" className="section-py bg-[#FDFAF5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-center">
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            Why Invest in Land
          </p>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1412] md:text-5xl">
          The Wisest Asset Class in India
        </h2>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#E8E0D0] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF8EC] text-2xl">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="mt-4 font-['Outfit'] text-lg font-semibold text-[#1A1412]">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="mt-2 font-['Outfit'] text-[15px] text-[#8A8078]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
