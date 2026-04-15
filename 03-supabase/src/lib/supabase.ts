import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// TODO: Get environment variables and validate they exist
const supabaseUrl = ___________
const supabaseKey = ___________

// TODO: Check that both environment variables are set, or throw an error
if (!supabaseUrl || !supabaseKey) {
  ___________
}

// TODO: Create and export the Supabase client
export const supabase = ___________
