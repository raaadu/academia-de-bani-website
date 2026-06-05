import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useAppState() {
  const { user: authUser } = useAuth()
  const uid = authUser?.id

  const [studentProfile, setStudentProfile] = useState(null)
  const [xp, setXp] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([])
  const [answeredExercises, setAnsweredExercises] = useState({})
  const [baselineScore, setBaselineScoreState] = useState(null)
  const [finalScore, setFinalScoreState] = useState(null)
  const [streak, setStreak] = useState(0)
  const [earnedBadges, setEarnedBadges] = useState([])

  // Load all data from Supabase whenever the auth user changes
  useEffect(() => {
    if (!uid) return
    fetchAll(uid)
  }, [uid])

  const fetchAll = async (userId) => {
    const [{ data: student }, { data: progress }, { data: attempts }] = await Promise.all([
      supabase.from('students').select('*').eq('id', userId).single(),
      supabase.from('progress').select('*').eq('student_id', userId).single(),
      supabase.from('exercise_attempts').select('*').eq('student_id', userId),
    ])

    if (student) {
      setStudentProfile(student)
    } else {
      // Student row missing — create it lazily from auth metadata
      // (happens when email confirmation was pending at signup time)
      const { data: { user: authUser } } = await supabase.auth.getUser()
      const meta = authUser?.user_metadata || {}
      const fallback = {
        id: userId,
        name: meta.name || authUser?.email?.split('@')[0] || 'User',
        cohort: meta.cohort || null,
        language: meta.language || 'ro',
      }
      const { error: upsertErr } = await supabase
        .from('students')
        .upsert(fallback, { onConflict: 'id' })
      if (!upsertErr) setStudentProfile(fallback)
      else console.error('Lazy student create failed:', upsertErr.message)
    }

    if (!progress) {
      // Progress row missing — create it lazily (DB trigger may have been blocked)
      const { error: progressErr } = await supabase
        .from('progress')
        .insert({ student_id: userId })
      if (progressErr) console.error('Lazy progress create failed:', progressErr.message)
    }

    if (progress) {
      setXp(progress.xp_total || 0)
      setCompletedLessons(progress.lessons_completed || [])
      setBaselineScoreState(progress.baseline_score ?? null)
      setFinalScoreState(progress.final_score ?? null)
      setEarnedBadges(progress.badges || [])

      // Streak logic
      const today = new Date().toDateString()
      const lastActive = progress.last_active
        ? new Date(progress.last_active).toDateString()
        : null

      if (lastActive !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        let newStreak = progress.streak_days || 0
        if (lastActive === yesterday.toDateString()) {
          newStreak += 1
        } else if (lastActive !== null) {
          newStreak = 1
        } else {
          newStreak = 1
        }
        setStreak(newStreak)
        supabase.from('progress')
          .update({ streak_days: newStreak, last_active: new Date().toISOString() })
          .eq('student_id', userId)
          .then(() => {})
      } else {
        setStreak(progress.streak_days || 0)
      }
    }

    if (attempts) {
      // Build map from most-recent attempt per question (first occurrence wins since
      // the UI prevents re-answering, but deduplicate just in case)
      const map = {}
      for (const a of attempts) {
        if (!map[a.question_id]) {
          map[a.question_id] = { correct: a.was_correct, answeredAt: a.attempted_at }
        }
      }
      setAnsweredExercises(map)
    }
  }

  // ── WRITES ──────────────────────────────────────────────

  const addXp = async (amount) => {
    const newXp = xp + amount
    setXp(newXp)
    await supabase.from('progress').update({ xp_total: newXp }).eq('student_id', uid)
  }

  const completeLesson = async (lessonId) => {
    if (completedLessons.includes(lessonId)) return
    const newLessons = [...completedLessons, lessonId]
    setCompletedLessons(newLessons)
    await supabase.from('progress').update({ lessons_completed: newLessons }).eq('student_id', uid)
  }

  const answerExercise = async (exerciseId, isCorrect) => {
    const newAnswered = {
      ...answeredExercises,
      [exerciseId]: { correct: isCorrect, answeredAt: new Date().toISOString() },
    }
    setAnsweredExercises(newAnswered)
    const exercisesCompleted = Object.keys(newAnswered)

    await Promise.all([
      supabase.from('progress')
        .update({ exercises_completed: exercisesCompleted })
        .eq('student_id', uid),
      supabase.from('exercise_attempts').insert({
        student_id: uid,
        question_id: exerciseId,
        was_correct: isCorrect,
      }),
    ])
  }

  const setBaselineScore = async (score) => {
    if (baselineScore !== null) return // only set once
    setBaselineScoreState(score)
    await supabase.from('progress')
      .update({ baseline_score: score })
      .eq('student_id', uid)
      .is('baseline_score', null)
  }

  const setFinalScore = async (score) => {
    const delta = baselineScore !== null ? score - baselineScore : null
    setFinalScoreState(score)
    await supabase.from('progress')
      .update({ final_score: score, delta })
      .eq('student_id', uid)
  }

  const earnBadge = async (badgeId) => {
    if (earnedBadges.includes(badgeId)) return
    const newBadges = [...earnedBadges, badgeId]
    setEarnedBadges(newBadges)
    await supabase.from('progress').update({ badges: newBadges }).eq('student_id', uid)
  }

  // setUser is used by ProfileTab to update name/cohort
  const setUser = async (updated) => {
    if (!updated) return
    setStudentProfile(prev => ({ ...prev, name: updated.name, cohort: updated.cohort }))
    await supabase.from('students')
      .update({ name: updated.name, cohort: updated.cohort })
      .eq('id', uid)
  }

  const getLevel = () => {
    if (xp < 100)  return { name: 'Novice',     next: 'Explorator', needed: 100  }
    if (xp < 300)  return { name: 'Explorator', next: 'Student',    needed: 300  }
    if (xp < 600)  return { name: 'Student',    next: 'Analist',    needed: 600  }
    if (xp < 1000) return { name: 'Analist',    next: 'Economist',  needed: 1000 }
    if (xp < 1500) return { name: 'Economist',  next: 'Expert',     needed: 1500 }
    return { name: 'Expert', next: null, needed: null }
  }

  // Expose the same shape as the old hook so every component works unchanged
  const user = studentProfile
    ? { name: studentProfile.name, cohort: studentProfile.cohort, joinedAt: studentProfile.created_at }
    : null

  const diagnosticDone = baselineScore !== null
  const setDiagnosticDone = () => {} // derived — no-op

  return {
    user, setUser,
    xp, addXp,
    completedLessons, completeLesson,
    answeredExercises, answerExercise,
    baselineScore, setBaselineScore,
    finalScore, setFinalScore,
    streak,
    earnedBadges, earnBadge,
    diagnosticDone, setDiagnosticDone,
    getLevel,
  }
}
