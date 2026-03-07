"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { ALL_36_STATES } from "./data";
import { supabase } from "@/lib/supabase";

const brokerFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  state: z.string().min(1, "Please select your state"),
  district: z.string().min(1, "Please enter your district"),
  land_size: z.string().optional(),
  land_type: z.string().optional(),
  experience: z.string().optional(),
  message: z.string().optional(),
});

type BrokerFormData = z.infer<typeof brokerFormSchema>;

const landSizes = ["Under 1 Acre", "1–5 Acres", "5–20 Acres", "20–100 Acres", "100+ Acres"];
const landTypes = ["Residential Plots", "Agricultural", "Commercial", "Mixed", "All Types"];
const experiences = ["Less than 1 year", "1–3 years", "3–7 years", "7+ years"];

export default function BrokerEnquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrokerFormData>({
    resolver: zodResolver(brokerFormSchema),
  });

  const onSubmit = async (data: BrokerFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('broker_leads').insert({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || null,
        state: data.state,
        district: data.district,
        land_size: data.land_size || null,
        land_type: data.land_type || null,
        experience: data.experience || null,
        message: data.message || null,
      });
      
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting broker form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-[#1A1412] py-20">
        <div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl px-4 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5A623]">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-white">
            Welcome to Our Partner Network!
          </h3>
          <p className="mt-4 font-['Outfit'] text-lg text-white/80">
            Our team will contact you within 24 hours to discuss partnership details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#1A1412] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-white md:text-5xl">
            Are You a Local Land Broker?
          </h2>
          <p className="mt-4 font-['Outfit'] text-lg text-white/70">
            Partner with Jamin Properties and earn industry-leading commissions
          </p>
        </div>

        {/* Form */}
        <div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl rounded-3xl bg-[#252525] p-8"
        >
          <h3 className="font-['Outfit'] text-xl font-semibold text-[#F5A623]">
            Broker / Agent Registration
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                Your Full Name *
              </label>
              <input
                {...register("full_name")}
                className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <p className="mt-1 font-['Outfit'] text-sm text-red-400">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                  Phone / WhatsApp *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && (
                  <p className="mt-1 font-['Outfit'] text-sm text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                  State You Operate In *
                </label>
                <select
                  {...register("state")}
                  className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                >
                  <option value="">Select state</option>
                  {ALL_36_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 font-['Outfit'] text-sm text-red-400">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                  District / Area *
                </label>
                <input
                  {...register("district")}
                  className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                  placeholder="Enter district"
                />
                {errors.district && (
                  <p className="mt-1 font-['Outfit'] text-sm text-red-400">
                    {errors.district.message}
                  </p>
                )}
              </div>
            </div>

            {/* Land Size & Type */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                  Avg Land Size You Handle
                </label>
                <select
                  {...register("land_size")}
                  className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                >
                  <option value="">Select size</option>
                  {landSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                  Type of Land You Deal In
                </label>
                <select
                  {...register("land_type")}
                  className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                >
                  <option value="">Select type</option>
                  {landTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                Years of Experience
              </label>
              <select
                {...register("experience")}
                className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
              >
                <option value="">Select experience</option>
                {experiences.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="mb-1 block font-['Outfit'] text-sm font-medium text-white">
                Tell us about your network
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-[#1A1412] px-4 py-3 font-['Outfit'] text-white outline-none transition-colors focus:border-[#F5A623]"
                placeholder="Describe your experience and network..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5A623] py-4 font-['Outfit'] text-base font-semibold text-[#1A1412] transition-colors hover:bg-[#D4891A] disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                "Join Our Partner Network →"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
