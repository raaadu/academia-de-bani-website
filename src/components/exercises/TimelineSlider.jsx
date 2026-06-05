import { useState, useEffect } from 'react'
import { L } from '../../hooks/useLanguage'
import { CATEGORY_META } from '../../data/exercises'
import { FeedbackBlock, XpFloat, AnswerOptions, DoneButton } from './FeedbackBlock'

export default function TimelineSlider({ exercise, onAnswer, answered, language, onClose }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showXp, setShowXp] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [animStep, setAnimStep] = useState(0) // 0..timelineYears.length-1
  const [showQuestion, setShowQuestion] = useState(false)

  const isCorrect = selected === exercise.correct
  const options = L(exercise.options, language)
  const question = L(exercise.question, language)
  const explanation = L(exercise.explanation, language)
  const sceneTitle = exercise.sceneTitle ? L(exercise.sceneTitle, language) : ''
  const meta = CATEGORY_META[exercise.category] || CATEGORY_META.banci

  const years = exercise.timelineYears || [0, 1, 2, 3]
  const values = exercise.timelineValues || [5000, 4630, 4281, 3956]
  const isShrink = exercise.timelineType === 'shrink'

  // Animate through timeline steps, then reveal question
  useEffect(() => {
    if (animStep < years.length - 1) {
      const t = setTimeout(() => setAnimStep(s => s + 1), 400)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setShowQuestion(true), 300)
      return () => clearTimeout(t)
    }
  }, [animStep])

  const sizeBase = isShrink ? 3.5 : 2
  const sizeTarget = isShrink ? 2 : 3.5
  const progress = years.length > 1 ? animStep / (years.length - 1) : 1
  const currentSize = sizeBase + (sizeTarget - sizeBase) * progress

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    if (isCorrect) {
      setShowXp(true)
      setTimeout(() => setShowXp(false), 900)
      onAnswer(exercise.id, true, exercise.xp)
    } else {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      onAnswer(exercise.id, false, 0)
    }
  }

  if (answered) return null

  return (
    <div className="relative">
      {showXp && <XpFloat xp={exercise.xp} />}

      {/* Scene banner */}
      <div
        className="rounded-t-2xl flex flex-col items-center gap-2 -mx-6 md:-mx-8 -mt-4 mb-5 px-6 py-5"
        style={{ background: meta.gradient }}
      >
        <span className="font-body font-semibold text-[14px] text-white/80 mb-1">{sceneTitle}</span>

        {/* Timeline bar */}
        <div className="flex items-end justify-between w-full max-w-[280px] gap-2">
          {years.map((yr, i) => {
            const isActive = i === animStep
            const isPast = i <= animStep
            const pct = isShrink
              ? (values[i] / values[0]) * 100
              : (values[i] / values[values.length - 1]) * 100

            return (
              <div key={yr} className="flex flex-col items-center gap-1 flex-1">
                <div className="font-body font-semibold text-[11px] text-white/70">
                  {values[i].toLocaleString()}
                </div>
                <div
                  className="w-full rounded-sm transition-all duration-400"
                  style={{
                    height: Math.max(4, (pct / 100) * 40),
                    background: isPast
                      ? (isShrink ? '#FF4D6A' : '#00D4AA')
                      : 'rgba(255,255,255,0.15)',
                    opacity: isPast ? 1 : 0.4,
                  }}
                />
                <div className="font-body text-[10px] text-white/60">An {yr}</div>
              </div>
            )
          })}
        </div>

        {/* Money emoji that grows/shrinks */}
        <div className="mt-2 transition-all duration-400"
          style={{ fontSize: `${currentSize}rem`, lineHeight: 1 }}
        >
          {exercise.sceneIcon}
        </div>
      </div>

      {/* Question — slides in after animation */}
      <div className={`transition-all duration-500 ${showQuestion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="font-body font-medium text-[16px] text-[#F0F0F5] leading-relaxed mb-4">{question}</p>

        <AnswerOptions
          options={options}
          selected={selected}
          submitted={submitted}
          correct={exercise.correct}
          onSelect={setSelected}
          shaking={shaking}
        />

        {submitted && (
          <FeedbackBlock isCorrect={isCorrect} explanation={explanation} language={language} />
        )}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="btn-accent mt-4 w-full py-3 rounded-xl font-body font-semibold text-[14px] text-white min-h-[48px] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {language === 'ro' ? 'Verifică' : 'Check'}
          </button>
        ) : (
          <DoneButton onClose={onClose} language={language} />
        )}
      </div>
    </div>
  )
}
