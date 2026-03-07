-- Run this in Supabase SQL Editor

-- Client Leads Table
CREATE TABLE IF NOT EXISTS client_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  state TEXT,
  budget_range TEXT,
  land_types TEXT[],
  heard_from TEXT,
  message TEXT,
  status TEXT DEFAULT 'New',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Broker Leads Table
CREATE TABLE IF NOT EXISTS broker_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  state TEXT,
  district TEXT,
  land_size TEXT,
  land_type TEXT,
  experience TEXT,
  message TEXT,
  status TEXT DEFAULT 'New',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE client_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public inserts client_leads" ON client_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts broker_leads" ON broker_leads FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated read client_leads" ON client_leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read broker_leads" ON broker_leads FOR SELECT USING (auth.role() = 'authenticated');
