import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// supabase will be null if env vars are not configured —
// the app gracefully falls back to localStorage-only mode.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          storageKey: 'adb_auth',
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null
