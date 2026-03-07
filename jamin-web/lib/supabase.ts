import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqzcalbietjwncucxoup.supabase.co'

export const supabase = createClient(
  supabaseUrl,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xemNhbGJpZXRqd25jdWN4b3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjE0NTIsImV4cCI6MjA4ODE5NzQ1Mn0.h_qXsSHcXw10QsHWNaimawhKA6oPkFPcdNK0BZe_u74'
)

export const supabaseAdmin = createClient(
  supabaseUrl,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xemNhbGJpZXRqd25jdWN4b3VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjYyMTQ1MiwiZXhwIjoyMDg4MTk3NDUyfQ.2GdDBIkCL7SuPaL-6hxPwr1zfe-0xpVcoAYNBpRK2HI'
)
