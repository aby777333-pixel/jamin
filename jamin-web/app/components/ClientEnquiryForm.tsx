"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { ALL_36_STATES } from "./data";
import { supabase } from "@/lib/supabase";

const clientFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().optional(),
  state: z.string().min(1, "Please select your state"),
  budget_range: z.string().min(1, "Please select your budget range"),
  land_types: z.array(z.string()).optional(),
  heard_from: z.string().optional(),
  message: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

const landTypes = ["Residential Plot", "Agricultural Land", "Commercial Land", "Farm Plot", "Any"];
const budgetRanges = ["Under ₹10L", "₹10L – ₹25L", "₹25L – ₹50L", "₹50L – ₹1Cr", "Above ₹1Cr"];
const heardFromOptions = ["Google", "WhatsApp", "Friend / Family", "Instagram", "LinkedIn", "Other"];

export default function ClientEnquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const selectedLandTypes = watch("land_types") || [];

  const toggleLandType = (type: string) => {
    const current = selectedLandTypes;
    if (current.includes(type)) {
      setValue(
        "land_types",
        current.filter((t) => t !== type)
      );
    } else {
      setValue("land_types", [...current, type]);
    }
  };

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('client_leads').insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        city: data.city || null,
        state: data.state,
        budget_range: data.budget_range,
        land_types: data.land_types || null,
        heard_from: data.heard_from || null,
        message: data.message || null,
      });
      
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="client-form" className="bg-[#D42B2B] py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl px-4 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <CheckCircle className="h-10 w-10 text-[#25D366]" />
          </div>
          <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-white">
            We&apos;ll Call You Shortly!
          </h3>
          <p className="mt-4 font-['Outfit'] text-lg text-white/80">
            Thank you for your inquiry. Our land advisors will contact you within 2 hours.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="client-form" className="bg-[#D42B2B] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-white/60 uppercase">
              For Investors
            </p>
            <h2 className="mt-4 font-['Cormorant_Garamond'] text-4xl font-semibold text-white md:text-5xl">
              Reserve Your Plot Today
            </h2>
            <p className="mt-4 font-['Outfit'] text-lg text-white/80">
              Our land advisors will contact you within 2 hours with verified opportunities matching your requirements.
            </p>

            {/* Trust Signals */}
            <div className="mt-8 space-y-3">
              {["✅ RERA-compliant properties", "✅ Verified legal documents", "✅ Zero hidden charges"].map(
                (signal, index) => (
                  <p key={index} className="font-['Outfit'] text-white/90">
                    {signal}
                  </p>
                )
              )}
            </div>

            {/* Live Signal */}
            <div className="mt-8 flex items-center gap-2">
              <span className="h-3 w-3 animate-pulse rounded-full bg-[#25D366]" />
              <span className="font-['Outfit'] text-sm text-white/80">
                3 advisors available right now
              </span>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl bg-white p-8"
          >
            <h3 className="font-['Outfit'] text-xl font-semibold text-[#1A1412]">
              Interested Investor
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                  Full Name *
                </label>
                <input
                  {...register("full_name")}
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="mt-1 font-['Outfit'] text-sm text-red-500">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 font-['Outfit'] text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                    Phone / WhatsApp *
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && (
                    <p className="mt-1 font-['Outfit'] text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                    Your City
                  </label>
                  <input
                    {...register("city")}
                    className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                    Your State *
                  </label>
                  <select
                    {...register("state")}
                    className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                  >
                    <option value="">Select state</option>
                    {ALL_36_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 font-['Outfit'] text-sm text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                  Budget Range *
                </label>
                <select
                  {...register("budget_range")}
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                >
                  <option value="">Select budget</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {errors.budget_range && (
                  <p className="mt-1 font-['Outfit'] text-sm text-red-500">
                    {errors.budget_range.message}
                  </p>
                )}
              </div>

              {/* Land Types */}
              <div>
                <label className="mb-2 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                  Preferred Land Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {landTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleLandType(type)}
                      className={`rounded-full px-4 py-2 font-['Outfit'] text-sm transition-colors ${
                        selectedLandTypes.includes(type)
                          ? "bg-[#D42B2B] text-white"
                          : "border border-[#E8E0D0] text-[#1A1412] hover:border-[#D42B2B]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* How did you hear */}
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                  How did you hear about us?
                </label>
                <select
                  {...register("heard_from")}
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                >
                  <option value="">Select an option</option>
                  {heardFromOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block font-['Outfit'] text-sm font-medium text-[#1A1412]">
                  Tell us more (optional)
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  className="w-full rounded-lg border border-[#E8E0D0] px-4 py-3 font-['Outfit'] text-[#1A1412] outline-none transition-colors focus:border-[#D42B2B]"
                  placeholder="Describe your investment requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D42B2B] py-4 font-['Outfit'] text-base font-semibold text-white transition-colors hover:bg-[#B02020] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  "Submit My Enquiry →"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
