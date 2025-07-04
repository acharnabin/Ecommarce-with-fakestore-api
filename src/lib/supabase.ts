import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABSE_PROJECT_URL!
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey);
