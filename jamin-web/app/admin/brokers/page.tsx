"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Filter, MoreVertical } from "lucide-react";

const mockBrokerLeads = [
  { id: 1, name: "Karthik Raj", phone: "+91 98765 43210", email: "karthik@email.com", state: "Tamil Nadu", district: "Chennai", landSize: "5-20 Acres", landType: "Residential Plots", experience: "3-7 years", date: "2025-03-07", status: "New" },
  { id: 2, name: "Ramesh Gupta", phone: "+91 98765 43211", email: "ramesh@email.com", state: "Karnataka", district: "Bengaluru", landSize: "20-100 Acres", landType: "Commercial", experience: "7+ years", date: "2025-03-06", status: "Contacted" },
  { id: 3, name: "Suresh Kumar", phone: "+91 98765 43212", email: "suresh@email.com", state: "Maharashtra", district: "Mumbai", landSize: "1-5 Acres", landType: "All Types", experience: "1-3 years", date: "2025-03-05", status: "New" },
  { id: 4, name: "Vijay Malhotra", phone: "+91 98765 43213", email: "vijay@email.com", state: "Gujarat", district: "Ahmedabad", landSize: "5-20 Acres", landType: "Agricultural", experience: "3-7 years", date: "2025-03-04", status: "Contacted" },
  { id: 5, name: "Arun Nair", phone: "+91 98765 43214", email: "arun@email.com", state: "Kerala", district: "Kochi", landSize: "1-5 Acres", landType: "Residential Plots", experience: "Less than 1 year", date: "2025-03-03", status: "New" },
];

const statusOptions = ["New", "Contacted", "Partnered", "Not Interested"];

export default function BrokerLeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredLeads = mockBrokerLeads.filter((lead) => {
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
            Broker Leads
          </h1>
          <p className="mt-1 font-['Outfit'] text-[#8A8078]">
            Manage partner broker registrations
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-[#F5A623] px-4 py-2 font-['Outfit'] text-sm font-semibold text-[#1A1412] hover:bg-[#D4891A]">
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
            className="w-full rounded-lg border border-[#E8E0D0] pl-10 pr-4 py-2 font-['Outfit'] text-[#1A1412] outline-none focus:border-[#F5A623]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-[#8A8078]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-[#E8E0D0] px-4 py-2 font-['Outfit'] text-[#1A1412] outline-none focus:border-[#F5A623]"
          >
            <option value="All">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
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
              <tr className="border-b border-[#E8E0D0] bg-[#FFF8EC]">
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">#</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Name</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Phone</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Email</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">State</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">District</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Land Size</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Land Type</th>
                <th className="px-4 py-3 text-left font-['Outfit'] text-sm font-medium text-[#8A8078]">Experience</th>
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
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.state}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.district}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.landSize}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.landType}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.experience}</td>
                  <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 font-['Outfit'] text-xs font-medium ${
                      lead.status === "New" ? "bg-blue-100 text-blue-700" :
                      lead.status === "Contacted" ? "bg-amber-100 text-amber-700" :
                      lead.status === "Partnered" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[#8A8078] hover:text-[#F5A623]">
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
