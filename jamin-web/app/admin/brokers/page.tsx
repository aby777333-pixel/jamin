"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, Filter, MoreVertical } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";

interface BrokerLead {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  state: string | null;
  district: string | null;
  land_size: string | null;
  land_type: string | null;
  experience: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusOptions = ["New", "Contacted", "Partnered", "Not Interested"];

export default function BrokerLeads() {
  const [leads, setLeads] = useState<BrokerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabaseAdmin
          .from('broker_leads')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setLeads(data || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csv = [
      ["Name", "Phone", "Email", "State", "District", "Land Size", "Land Type", "Experience", "Date", "Status"],
      ...filteredLeads.map(lead => [
        lead.full_name,
        lead.phone,
        lead.email || '',
        lead.state || '',
        lead.district || '',
        lead.land_size || '',
        lead.land_type || '',
        lead.experience || '',
        new Date(lead.created_at).toLocaleDateString(),
        lead.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "broker_leads.csv";
    a.click();
  };

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
        <button onClick={handleExport} className="flex items-center gap-2 rounded-full bg-[#F5A623] px-4 py-2 font-['Outfit'] text-sm font-semibold text-[#1A1412] hover:bg-[#D4891A]">
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
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-[#8A8078]">Loading...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-[#8A8078]">No leads found</td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <tr key={lead.id} className="border-b border-[#E8E0D0]/50">
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{index + 1}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm font-medium text-[#1A1412]">{lead.full_name}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.phone}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.email || '-'}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.state || '-'}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.district || '-'}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.land_size || '-'}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.land_type || '-'}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{lead.experience || '-'}</td>
                    <td className="px-4 py-3 font-['Outfit'] text-sm text-[#8A8078]">{new Date(lead.created_at).toLocaleDateString()}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
