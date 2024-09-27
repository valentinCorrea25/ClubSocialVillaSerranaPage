import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mvulbmjlvpjujjfvffph.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dWxibWpsdnBqdWpqZnZmZnBoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTQyOTMzNywiZXhwIjoyMDM3MDA1MzM3fQ.U6ptZDVcA3sZmYgfmzUcitcZuRCEfQHytrQy5zU6bU8'
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
