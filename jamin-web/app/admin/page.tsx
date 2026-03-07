"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Handshake, Clock } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";

interface Stats {
  clientLeads: number;
  newThisWeek: number;
  brokerLeads: number;
  pendingFollowUp: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    clientLeads: 0,
    newThisWeek: 0,
    brokerLeads: 0,
    pendingFollowUp: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const [clientRes, brokerRes] = await Promise.all([
          supabaseAdmin.from('client_leads').select('created_at, status', { count: 'exact' }),
          supabaseAdmin.from('broker_leads').select('created_at, status', { count: 'exact' })
        ]);

        const clients = clientRes.data || [];
        const brokers = brokerRes.data || [];
        
        const newThisWeek = clients.filter(c => new Date(c.created_at) >= oneWeekAgo).length;
        const pending = clients.filter(c => c.status === 'New').length;

        setStats({
          clientLeads: clients.length,
          newThisWeek,
          brokerLeads: brokers.length,
          pendingFollowUp: pending,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Client Leads",
      value: stats.clientLeads,
      change: "+12 this week",
      icon: Users,
      color: "bg-[#D42B2B]",
    },
    {
      title: "New This Week",
      value: stats.newThisWeek,
      change: "+5 from last week",
      icon: UserPlus,
      color: "bg-[#F5A623]",
    },
    {
      title: "Total Broker Leads",
      value: stats.brokerLeads,
      change: "+3 this month",
      icon: Handshake,
      color: "bg-[#25D366]",
    },
    {
      title: "Pending Follow-up",
      value: stats.pendingFollowUp,
      action: "Call today",
      icon: Clock,
      color: "bg-[#8A8078]",
    },
  ];

  return (
    <div>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1412]">
        Dashboard
      </h1>
      <p className="mt-1 font-['Outfit'] text-[#8A8078]">
        Welcome back! Here&apos;s your overview.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
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
                    {loading ? "..." : stat.value}
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
          <p className="py-4 text-center text-[#8A8078]">
            Connect Supabase tables to see recent leads here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
