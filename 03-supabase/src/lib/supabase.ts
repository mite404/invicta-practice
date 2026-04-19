import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

// TODO: Get environment variables and validate they exist
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// TODO: Check that both environment variables are set, or throw an error
if (!supabaseUrl || !supabaseKey) {
  throw Error("Missing Supabase environment variables");
}

// TODO: Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
