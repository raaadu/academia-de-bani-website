import { useState } from 'react'
import { L } from '../../hooks/useLanguage'
import { CATEGORY_META } from '../../data/exercises'
import { FeedbackBlock, XpFloat, DoneButton } from './FeedbackBlock'

export default function SwipeSorter({ exercise, onAnswer, answered, language, onClose }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showXp, setShowXp] = useState(false)
  const [shaking, setShaking] = useState(false)

  const isCorrect = selected === exercise.correct
  const options = L(exercise.options, language)
  const question = L(exercise.question, language)
  const explanation = L(exercise.explanation, language)
  const meta = CATEGORY_META[exercise.category] || CATEGORY_META.banci
  const letters = ['A', 'B', 'C', 'D']

  const handleSelect = (i) => {
    if (submitted) return
    setSelected(i)
  }

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

      {/* Statement card */}
      <div
        className="rounded-2xl flex flex-col items-center justify-center gap-3 -mx-6 md:-mx-8 -mt-4 mb-5 px-6 py-8"
        style={{ background: meta.gradient }}
      >
        <span style={{ fontSize: '4rem', lineHeight: 1 }}>{exercise.sceneIcon}</span>
        <p className="font-body font-semibold text-[17px] text-white text-center leading-snug max-w-[280px]">
          {question}
        </p>
      </div>

      {/* 2×2 option grid */}
      <div className={`grid grid-cols-2 gap-3 ${shaking ? 'shake' : ''}`}>
        {options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.04)'
          let border = '1px solid rgba(255,255,255,0.08)'
          let color = '#C8C8D4'
          let letterBg = 'rgba(108,99,255,0.15)'
          let letterColor = '#a89cff'

          if (submitted) {
            if (i === exercise.correct) {
              bg = 'rgba(0,212,170,0.12)'; border = '1px solid rgba(0,212,170,0.4)'; color = '#00D4AA'
              letterBg = 'rgba(0,212,170,0.2)'; letterColor = '#00D4AA'
            } else if (i === selected && i !== exercise.correct) {
              bg = 'rgba(255,77,106,0.12)'; border = '1px solid rgba(255,77,106,0.4)'; color = '#FF4D6A'
              letterBg = 'rgba(255,77,106,0.2)'; letterColor = '#FF4D6A'
            } else {
              bg = 'rgba(255,255,255,0.02)'; color = '#4A4B5A'; letterColor = '#4A4B5A'
            }
          } else if (selected === i) {
            bg = 'rgba(108,99,255,0.15)'; border = '1px solid rgba(108,99,255,0.5)'; color = '#a89cff'
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => handleSelect(i)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 min-h-[80px] justify-center"
              style={{ background: bg, border, color }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center font-body font-semibold text-[12px]"
                style={{ background: letterBg, color: letterColor }}
              >
                {letters[i]}
              </span>
              <span className="font-body text-[13px] leading-snug text-center">{opt}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <FeedbackBlock isCorrect={isCorrect} explanation={explanation} language={language} />
      )}

      {/* Actions */}
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
  )
}
