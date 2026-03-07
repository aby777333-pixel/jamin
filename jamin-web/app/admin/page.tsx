"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Handshake, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Client Leads",
    value: "124",
    change: "+12 this week",
    icon: Users,
    color: "bg-[#D42B2B]",
  },
  {
    title: "New This Week",
    value: "18",
    change: "+5 from last week",
    icon: UserPlus,
    color: "bg-[#F5A623]",
  },
  {
    title: "Total Broker Leads",
    value: "42",
    change: "+3 this month",
    icon: Handshake,
    color: "bg-[#25D366]",
  },
  {
    title: "Pending Follow-up",
    value: "8",
    action: "Call today",
    icon: Clock,
    color: "bg-[#8A8078]",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1412]">
        Dashboard
      </h1>
      <p className="mt-1 font-['Outfit'] text-[#8A8078]">
        Welcome back! Here&apos;s your overview.
      </p>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Outfit'] text-sm text-[#8A8078]">
                    {stat.title}
                  </p>
                  <p className="mt-2 font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1412]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-['Outfit'] text-xs text-[#8A8078]">
                    {stat.change || stat.action}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-['Outfit'] text-lg font-semibold text-[#1A1412]">
          Recent Client Leads
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E0D0]">
                <th className="pb-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">
                  Name
                </th>
                <th className="pb-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">
                  Phone
                </th>
                <th className="pb-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">
                  State
                </th>
                <th className="pb-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">
                  Budget
                </th>
                <th className="pb-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Rajesh Kumar", phone: "+91 98765 43210", state: "Tamil Nadu", budget: "₹25L – ₹50L", status: "New" },
                { name: "Priya Sharma", phone: "+91 98765 43211", state: "Maharashtra", budget: "₹50L – ₹1Cr", status: "Contacted" },
                { name: "Anand Patel", phone: "+91 98765 43212", state: "Gujarat", budget: "₹10L – ₹25L", status: "New" },
                { name: "Meera Krishnan", phone: "+91 98765 43213", state: "Karnataka", budget: "₹1Cr+", status: "Closed" },
              ].map((lead, index) => (
                <tr key={index} className="border-b border-[#E8E0D0]/50">
                  <td className="py-3 font-['Outfit'] text-sm text-[#1A1412]">
                    {lead.name}
                  </td>
                  <td className="py-3 font-['Outfit'] text-sm text-[#8A8078]">
                    {lead.phone}
                  </td>
                  <td className="py-3 font-['Outfit'] text-sm text-[#8A8078]">
                    {lead.state}
                  </td>
                  <td className="py-3 font-['Outfit'] text-sm text-[#8A8078]">
                    {lead.budget}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-1 font-['Outfit'] text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : lead.status === "Contacted"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
