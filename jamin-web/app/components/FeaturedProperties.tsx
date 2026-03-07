"use client";

import { MapPin, ArrowRight } from "lucide-react";
import { properties } from "./data";
import Link from "next/link";

export default function FeaturedProperties() {
  return (
    <section id="properties" className="section-py bg-[#F5F0E8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-center">
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            Prime Locations
          </p>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1412] md:text-5xl">
          Land Opportunities Across India
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-2xl text-center font-['Outfit'] text-lg text-[#8A8078]">
          Handpicked. Verified. High-potential.
        </p>

        {/* Properties Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-3xl bg-white transition-all hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Status Badge */}
                <div
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 font-['Outfit'] text-xs font-semibold ${
                    property.status === "Limited"
                      ? "bg-[#D42B2B] text-white"
                      : "bg-[#25D366] text-white"
                  }`}
                >
                  {property.status === "Limited" ? "🔥 " : ""}
                  {property.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Type Chip */}
                <span className="inline-block rounded-full bg-[#FFF8EC] px-3 py-1 font-['Outfit'] text-xs font-medium text-[#F5A623]">
                  {property.type}
                </span>

                {/* Title */}
                <h3 className="mt-3 font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1412]">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="mt-2 flex items-center gap-1 font-['Outfit'] text-sm text-[#8A8078]">
                  <MapPin size={14} />
                  {property.location}
                </div>

                {/* Size & Price */}
                <div className="mt-4 flex items-center justify-between font-['Outfit']">
                  <span className="text-sm text-[#8A8078]">{property.size}</span>
                  <span className="font-semibold text-[#D42B2B]">{property.price}</span>
                </div>

                {/* Highlight */}
                <p className="mt-3 font-['Outfit'] text-sm italic text-[#D42B2B]">
                  {property.highlight}
                </p>

                {/* CTA */}
                <Link
                  href="#client-form"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#D42B2B] py-2.5 font-['Outfit'] text-sm font-semibold text-[#D42B2B] transition-colors hover:bg-[#D42B2B] hover:text-white"
                >
                  Enquire About This Plot
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
