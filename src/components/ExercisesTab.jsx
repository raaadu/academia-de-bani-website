import { useState } from 'react'
import { EXERCISES, CATEGORIES } from '../data/exercises'
import DiagnosticQuiz from './DiagnosticQuiz'
import { useLanguage, L } from '../hooks/useLanguage'
import QuestMap from './exercises/QuestMap'
import ScenarioCard from './exercises/ScenarioCard'
import DangerDetector from './exercises/DangerDetector'
import SwipeSorter from './exercises/SwipeSorter'
import TimelineSlider from './exercises/TimelineSlider'
import DragAndRank from './exercises/DragAndRank'

const FORMAT_COMPONENTS = {
  scenario: ScenarioCard,
  danger:   DangerDetector,
  swipe:    SwipeSorter,
  timeline: TimelineSlider,
  drag:     DragAndRank,
}

function SheetBackdrop({ children }) {
  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-end md:items-center md:justify-center md:p-4"
      style={{ background: 'rgba(8,9,14,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full md:max-w-xl overflow-y-auto slide-up-sheet md:fade-in-up"
        style={{
          background: 'rgba(22,24,32,0.97)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: '24px 24px 0 0',
          maxHeight: '90vh',
          paddingBottom: 'env(safe-area-inset-bottom)',
          boxShadow: '0 -16px 64px rgba(0,0,0,0.5)',
        }}
        ref={(el) => {
          if (el && window.matchMedia('(min-width: 768px)').matches) {
            el.style.borderRadius = '20px'
          }
        }}
      >
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#7B7D8E]" />
        </div>
        <div className="px-6 md:px-8 pt-4 pb-8">{children}</div>
      </div>
    </div>
  )
}

function QuestionSheet({ exercise, onAnswer, onClose, answeredExercises, language }) {
  const FormatComponent = FORMAT_COMPONENTS[exercise.format] || ScenarioCard
  return (
    <SheetBackdrop>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">{exercise.sceneIcon}</span>
          <span
            className="font-body font-semibold text-[12px] uppercase tracking-wider"
            style={{ color: '#a89cff' }}
          >
            {exercise.category} · {exercise.level}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#7B7D8E] hover:text-[#F0F0F5] transition-colors p-1"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <FormatComponent
        exercise={exercise}
        onAnswer={onAnswer}
        answered={answeredExercises[exercise.id]}
        language={language}
        onClose={onClose}
      />
    </SheetBackdrop>
  )
}

export default function ExercisesTab({ appState }) {
  const { language, t } = useLanguage()
  const {
    answeredExercises, answerExercise, addXp,
    diagnosticDone, setDiagnosticDone,
    setBaselineScore, baselineScore,
    finalScore, setFinalScore,
    completedLessons,
  } = appState

  const [showDiagnostic, setShowDiagnostic] = useState(!diagnosticDone)
  const [showFinal, setShowFinal] = useState(false)
  const [activeCategory, setActiveCategory] = useState('toate')
  const [activeLevel, setActiveLevel] = useState(null)
  const [activeExercise, setActiveExercise] = useState(null)

  const allCompleted = completedLessons.length === 3
  const answeredCount = Object.keys(answeredExercises).length

  const handleDiagnosticComplete = (score) => {
    setBaselineScore(score)
    setDiagnosticDone(true)
    setShowDiagnostic(false)
  }

  const handleFinalComplete = (score) => {
    setFinalScore(score)
    setShowFinal(false)
  }

  const handleAnswer = (id, correct, xpAmount) => {
    answerExercise(id, correct)
    if (correct && xpAmount > 0) addXp(xpAmount)
  }

  const levelFilters = [
    { id: null, labelKey: 'exercises.levels.all' },
    { id: 'incepator', labelKey: 'exercises.levels.incepator' },
    { id: 'avansat', labelKey: 'exercises.levels.avansat' },
    { id: 'expert', labelKey: 'exercises.levels.expert' },
  ]

  // All exercises for the map (unfiltered by level, just category)
  const mapExercises = EXERCISES.filter(e =>
    activeCategory === 'toate' || e.category === activeCategory
  )

  // Filter for level chip (visual dim only — map shows all, level filter just dims)
  // Actually per spec: filter chips highlight nodes, others dim. We'll filter the list
  // but keep the map showing category-filtered exercises.
  const filtered = EXERCISES.filter(e => {
    if (activeCategory !== 'toate' && e.category !== activeCategory) return false
    if (activeLevel && e.level !== activeLevel) return false
    return true
  })

  return (
    <div className="px-4 py-6 md:p-8 max-w-2xl mx-auto">

      {/* Diagnostic sheet */}
      {showDiagnostic && (
        <SheetBackdrop>
          <DiagnosticQuiz onComplete={handleDiagnosticComplete} />
        </SheetBackdrop>
      )}

      {/* Final test sheet */}
      {showFinal && (
        <SheetBackdrop>
          <DiagnosticQuiz onComplete={handleFinalComplete} isFinal />
        </SheetBackdrop>
      )}

      {/* Question sheet */}
      {activeExercise && (
        <QuestionSheet
          exercise={activeExercise}
          onAnswer={handleAnswer}
          onClose={() => setActiveExercise(null)}
          answeredExercises={answeredExercises}
          language={language}
        />
      )}

      {/* Heading */}
      <h1 className="font-syne font-extrabold text-[36px] md:text-[48px] text-[#F0F0F5] leading-none mb-2">
        {t('exercises.heading')}
      </h1>
      <p className="font-body text-[14px] text-[#7B7D8E] mb-6">{t('exercises.subtitle')}</p>

      {/* Diagnostic banner */}
      {!diagnosticDone ? (
        <button
          onClick={() => setShowDiagnostic(true)}
          className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl mb-4 transition-all duration-200"
          style={{
            background: 'rgba(108,99,255,0.08)',
            border: '1px solid rgba(108,99,255,0.4)',
            boxShadow: '0 0 24px rgba(108,99,255,0.12)',
            animation: 'nodePulse 2s ease-in-out infinite',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[24px]">🎯</span>
            <div className="text-left">
              <div className="font-body font-semibold text-[14px] text-[#F0F0F5]">
                {t('exercises.startDiagnostic')}
              </div>
              <div className="font-body text-[12px] text-[#7B7D8E]">
                {language === 'ro' ? '5 întrebări · 2 minute' : '5 questions · 2 minutes'}
              </div>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      ) : (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4 w-fit"
          style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)' }}
        >
          <span className="text-[14px]">🎯</span>
          <span className="font-body font-medium text-[13px] text-[#00D4AA]">
            {t('exercises.baselineChip', baselineScore ?? '—')}
          </span>
        </div>
      )}

      {/* Progress reassessment banner */}
      {allCompleted && !showFinal && finalScore === null && (
        <button
          onClick={() => setShowFinal(true)}
          className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl mb-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,170,0.1))',
            border: '1px solid rgba(108,99,255,0.3)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[22px]">🚀</span>
            <span className="font-body font-semibold text-[14px] text-[#F0F0F5]">
              {t('exercises.measureProgressBanner')}
            </span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* XP progress bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-body font-medium text-[13px] text-[#7B7D8E]">
            {t('exercises.questProgress', answeredCount, EXERCISES.length)}
          </span>
          <span className="font-body font-semibold text-[13px] text-[#6C63FF]">
            {Math.round((answeredCount / EXERCISES.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full progress-bar-gradient rounded-full transition-all duration-700"
            style={{ width: `${(answeredCount / EXERCISES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-6" style={{ scrollSnapType: 'x mandatory' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex-shrink-0 px-3.5 py-2 rounded-full font-body text-[13px] font-medium transition-all duration-200 min-h-[40px]"
            style={{
              scrollSnapAlign: 'start',
              background: activeCategory === cat.id ? '#6C63FF' : 'rgba(255,255,255,0.04)',
              border: activeCategory === cat.id ? '1px solid #6C63FF' : '1px solid rgba(255,255,255,0.08)',
              color: activeCategory === cat.id ? 'white' : '#7B7D8E',
              boxShadow: activeCategory === cat.id ? '0 0 16px rgba(108,99,255,0.3)' : 'none',
            }}
          >
            {t(`exercises.categories.${cat.id}`)}
          </button>
        ))}

        <div className="flex-shrink-0 w-px bg-white/[0.08] mx-1" />

        {levelFilters.map(lvl => (
          <button
            key={lvl.id ?? 'all'}
            onClick={() => setActiveLevel(lvl.id)}
            className="flex-shrink-0 px-3.5 py-2 rounded-full font-body text-[13px] font-medium transition-all duration-200 min-h-[40px]"
            style={{
              scrollSnapAlign: 'start',
              background: activeLevel === lvl.id ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.04)',
              border: activeLevel === lvl.id ? '1px solid rgba(0,212,170,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: activeLevel === lvl.id ? '#00D4AA' : '#7B7D8E',
            }}
          >
            {t(lvl.labelKey)}
          </button>
        ))}
      </div>

      {/* Quest Map */}
      <QuestMap
        exercises={filtered}
        answered={answeredExercises}
        activeCategory={activeCategory}
        onSelect={setActiveExercise}
      />

    </div>
  )
}
