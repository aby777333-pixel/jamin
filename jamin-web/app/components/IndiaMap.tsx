"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { statesData } from "./data";

const indiaStates: Record<string, string> = {
  "Tamil Nadu": "35.814",
  "Karnataka": "29.653",
  "Andhra Pradesh": "15.924",
  "Telangana": "18.112",
  "Maharashtra": "19.663",
  "Gujarat": "22.257",
  "Rajasthan": "27.024",
  "Kerala": "8.900",
  "Madhya Pradesh": "23.473",
  "Odisha": "19.963",
  "Uttar Pradesh": "26.846",
  "West Bengal": "22.987",
};

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <section className="section-py bg-[#0F0A0A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            Where We Operate
          </p>
          <h2 className="mt-4 font-['Cormorant_Garamond'] text-4xl font-semibold text-white md:text-5xl">
            We Operate Across India
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-['Outfit'] text-lg text-white/60">
            Active in 12 states and growing
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Map SVG */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <svg
              viewBox="0 0 800 900"
              className="w-full max-w-lg"
              style={{ filter: "drop-shadow(0 0 20px rgba(212, 43, 43, 0.2))" }}
            >
              {/* Simplified India Map Path */}
              <path
                d="M450 50 L500 80 L550 100 L600 150 L620 200 L600 280 L580 350 L560 400 L540 450 L500 500 L460 550 L420 600 L380 650 L340 700 L300 720 L280 680 L300 620 L340 560 L380 500 L420 440 L440 380 L450 320 L440 260 L420 200 L400 150 L420 100 L450 50 Z"
                fill={hoveredState ? "#F5A623" : "#D42B2B"}
                opacity={hoveredState ? 1 : 0.9}
                className="transition-all duration-300"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredState("India")}
                onMouseLeave={() => setHoveredState(null)}
              />
              {/* State dots */}
              {statesData.map((state) => {
                const coords = indiaStates[state.name]?.split(" ");
                if (!coords) return null;
                return (
                  <g key={state.name}>
                    <circle
                      cx={coords[1] ? 200 + parseFloat(coords[1]) * 15 : 400}
                      cy={coords[0] ? 800 - parseFloat(coords[0]) * 12 : 400}
                      r={hoveredState === state.name ? 12 : 8}
                      fill={hoveredState === state.name ? "#F5A623" : "#D42B2B"}
                      className="transition-all duration-300"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredState(state.name)}
                      onMouseLeave={() => setHoveredState(null)}
                    />
                    <circle
                      cx={coords[1] ? 200 + parseFloat(coords[1]) * 15 : 400}
                      cy={coords[0] ? 800 - parseFloat(coords[0]) * 12 : 400}
                      r={20}
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredState(state.name)}
                      onMouseLeave={() => setHoveredState(null)}
                    />
                  </g>
                );
              })}
            </svg>
            
            {/* Hover Tooltip */}
            {hoveredState && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute rounded-lg bg-white px-4 py-2 shadow-lg"
              >
                <p className="font-['Outfit'] text-sm font-semibold text-[#1A1412]">
                  {hoveredState}
                </p>
                <p className="font-['Outfit'] text-xs text-[#8A8078]">
                  {statesData.find(s => s.name === hoveredState)?.projects || 0} projects
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* States List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4">
              {statesData.map((state, index) => (
                <motion.div
                  key={state.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                  onMouseEnter={() => setHoveredState(state.name)}
                  onMouseLeave={() => setHoveredState(null)}
                >
                  <span className="font-['Outfit'] text-white">{state.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#F5A623]">
                      {state.projects}
                    </span>
                    <span className="font-['Outfit'] text-xs text-white/40">projects</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
