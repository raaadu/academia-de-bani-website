import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase environment variables.\n' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file or Vercel dashboard.'
  )
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseKey ?? 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'adb_session',
    },
  }
)
