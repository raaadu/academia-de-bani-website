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
    // Step 1: Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, cohort, language }, // backup: stored in auth metadata
      },
    })

    if (error) return { user: null, error }

    // Step 2: Check we actually have a user id
    const userId = data?.user?.id
    if (!userId) {
      return { user: null, error: new Error('No user ID returned from auth') }
    }

    // Step 3: Insert into public.students (upsert is safe on retry).
    // Non-fatal: if email confirmation is pending there is no session yet, so
    // auth.uid() returns null and RLS blocks the insert. The row will be
    // created lazily in fetchAll the first time the user signs in.
    const { error: studentError } = await supabase
      .from('students')
      .upsert(
        { id: userId, name, cohort: cohort || null, language: language || 'ro' },
        { onConflict: 'id' },
      )

    if (studentError) {
      console.warn('Student row not created during signup (will retry on first login):', studentError.message)
    }

    // Step 4: Progress row — also non-fatal for the same reason
    if (!studentError) {
      const { data: existingProgress } = await supabase
        .from('progress')
        .select('id')
        .eq('student_id', userId)
        .single()

      if (!existingProgress) {
        const { error: progressError } = await supabase
          .from('progress')
          .insert({ student_id: userId })
        if (progressError) {
          console.warn('Progress row not created during signup:', progressError.message)
        }
      }
    }

    // Auth account was created — that's all we need to unblock the user
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
