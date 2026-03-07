"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Filter, MoreVertical } from "lucide-react";

const mockClientLeads = [
  { id: 1, name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", city: "Chennai", state: "Tamil Nadu", budget: "₹25L – ₹50L", landType: "Residential Plot", date: "2025-03-07", status: "New" },
  { id: 2, name: "Priya Sharma", phone: "+91 98765 43211", email: "priya@email.com", city: "Mumbai", state: "Maharashtra", budget: "₹50L – ₹1Cr", landType: "Commercial Land", date: "2025-03-06", status: "Contacted" },
  { id: 3, name: "Anand Patel", phone: "+91 98765 43212", email: "anand@email.com", city: "Ahmedabad", state: "Gujarat", budget: "₹10L – ₹25L", landType: "Agricultural Land", date: "2025-03-06", status: "New" },
  { id: 4, name: "Meera Krishnan", phone: "+91 98765 43213", email: "meera@email.com", city: "Bengaluru", state: "Karnataka", budget: "₹1Cr+", landType: "Residential Plot", date: "2025-03-05", status: "Closed" },
  { id: 5, name: "Vikram Reddy", phone: "+91 98765 43214", email: "vikram@email.com", city: "Hyderabad", state: "Telangana", budget: "₹50L – ₹1Cr", landType: "Commercial Land", date: "2025-03-05", status: "Not Interested" },
  { id: 6, name: "Suresh Nair", phone: "+91 98765 43215", email: "suresh@email.com", city: "Kochi", state: "Kerala", budget: "₹25L – ₹50L", landType: "Farm Plot", date: "2025-03-04", status: "Contacted" },
];

const statusOptions = ["New", "Contacted", "Closed", "Not Interested"];

export default function ClientLeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredLeads = mockClientLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1412]">
            Client Leads
          </h1>
          <p className="mt-1 font-['Outfit'] text-[#8A8078]">
            Manage and track investor inquiries
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-[#D42B2B] px-4 py-2 font-['Outfit'] text-sm font-semibold text-white hover:bg-[#B02020]">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8078]" size={20} />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#E8E0D0] pl-10 pr-4 py-2 font-['Outfit'] text-[#1A1412] outline-none focus:border-[#D42B2B]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-[#8A8078]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-[#E8E0D0] px-4 py-2 font-['Outfit'] text-[#1A1412] outline-none focus:border-[#D42B2B]"
          >
            <option value="All">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E0D0] bg-[#FDFAF5]">
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">#</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Name</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Phone</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Email</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">City</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">State</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Budget</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Land Type</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Date</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Status</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={lead.id} className="border-b border-[#E8E0D0]/50">
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{index + 1}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm font-medium text-[#1A1412]">{lead.name}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.phone}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.email}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.city}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.state}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.budget}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.landType}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 font-['Outfit'] text-xs font-medium ${
                      lead.status === "New" ? "bg-blue-100 text-blue-700" :
                      lead.status === "Contacted" ? "bg-amber-100 text-amber-700" :
                      lead.status === "Closed" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[#8A8078] hover:text-[#D42B2B]">
                      <MoreVertical size={18} />
                    </button>
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
