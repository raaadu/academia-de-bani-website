import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('localStorage error:', error)
    }
  }

  return [storedValue, setValue]
}

export function useAppState() {
  const [user, setUser] = useLocalStorage('adb_user', null)
  const [xp, setXp] = useLocalStorage('adb_xp', 0)
  const [completedLessons, setCompletedLessons] = useLocalStorage('adb_completed_lessons', [])
  const [answeredExercises, setAnsweredExercises] = useLocalStorage('adb_answered_exercises', {})
  const [baselineScore, setBaselineScore] = useLocalStorage('adb_baseline_score', null)
  const [finalScore, setFinalScore] = useLocalStorage('adb_final_score', null)
  const [streak, setStreak] = useLocalStorage('adb_streak', 0)
  const [lastActiveDate, setLastActiveDate] = useLocalStorage('adb_last_active', null)
  const [earnedBadges, setEarnedBadges] = useLocalStorage('adb_badges', [])
  const [diagnosticDone, setDiagnosticDone] = useLocalStorage('adb_diagnostic_done', false)

  useEffect(() => {
    const today = new Date().toDateString()
    if (lastActiveDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastActiveDate === yesterday.toDateString()) {
        setStreak(s => s + 1)
      } else if (lastActiveDate !== null) {
        setStreak(1)
      }
      setLastActiveDate(today)
    }
  }, [])

  const addXp = (amount) => {
    setXp(prev => prev + amount)
  }

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId])
    }
  }

  const answerExercise = (exerciseId, isCorrect) => {
    setAnsweredExercises(prev => ({
      ...prev,
      [exerciseId]: { correct: isCorrect, answeredAt: Date.now() },
    }))
  }

  const earnBadge = (badgeId) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges(prev => [...prev, badgeId])
    }
  }

  const getLevel = () => {
    if (xp < 100) return { name: 'Novice', next: 'Explorator', needed: 100 }
    if (xp < 300) return { name: 'Explorator', next: 'Student', needed: 300 }
    if (xp < 600) return { name: 'Student', next: 'Analist', needed: 600 }
    if (xp < 1000) return { name: 'Analist', next: 'Economist', needed: 1000 }
    if (xp < 1500) return { name: 'Economist', next: 'Expert', needed: 1500 }
    return { name: 'Expert', next: null, needed: null }
  }

  const resetAll = () => {
    setUser(null)
    setXp(0)
    setCompletedLessons([])
    setAnsweredExercises({})
    setBaselineScore(null)
    setFinalScore(null)
    setStreak(0)
    setLastActiveDate(null)
    setEarnedBadges([])
    setDiagnosticDone(false)
  }

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
    resetAll,
  }
}
