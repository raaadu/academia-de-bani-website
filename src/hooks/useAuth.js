import { createContext, useContext, useState, useEffect, createElement } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Keep in sync with any auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, name, cohort, language) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { user: null, error }

    // Insert student row — DB trigger auto-creates the progress row
    if (data.user) {
      const { error: insertError } = await supabase.from('students').insert({
        id: data.user.id,
        name,
        cohort,
        language,
      })
      if (insertError) console.error('students insert:', insertError)
    }

    return { user: data.user, error: null }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { user: data?.user ?? null, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut({ scope: 'local' })
  }

  return createElement(
    AuthContext.Provider,
    { value: { user, loading, signUp, signIn, signOut } },
    children
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
