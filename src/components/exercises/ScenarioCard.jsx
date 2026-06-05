import { useState } from 'react'
import { L } from '../../hooks/useLanguage'
import { CATEGORY_META } from '../../data/exercises'
import { FeedbackBlock, XpFloat, AnswerOptions, DoneButton } from './FeedbackBlock'

export default function ScenarioCard({ exercise, onAnswer, answered, language, onClose }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showXp, setShowXp] = useState(false)
  const [shaking, setShaking] = useState(false)

  const isCorrect = selected === exercise.correct
  const options = L(exercise.options, language)
  const question = L(exercise.question, language)
  const explanation = L(exercise.explanation, language)
  const formula = exercise.formula ? L(exercise.formula, language) : null
  const sceneTitle = exercise.sceneTitle ? L(exercise.sceneTitle, language) : ''
  const meta = CATEGORY_META[exercise.category] || CATEGORY_META.banci

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
        className="rounded-t-2xl flex flex-col items-center justify-center gap-2 -mx-6 md:-mx-8 -mt-4 mb-5 px-6"
        style={{ background: meta.gradient, minHeight: 120 }}
      >
        <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{exercise.sceneIcon}</span>
        <span className="font-body font-semibold text-[15px] text-white text-center">{sceneTitle}</span>
      </div>

      {/* Question */}
      <p className="font-body font-medium text-[16px] text-[#F0F0F5] leading-relaxed mb-4">{question}</p>

      {/* Formula box */}
      {formula && (
        <div
          className="mb-4 rounded-xl"
          style={{
            background: 'rgba(108,99,255,0.1)',
            borderLeft: '3px solid #6C63FF',
            padding: '12px 16px',
          }}
        >
          <div className="font-body font-semibold text-[12px] text-[#a89cff] mb-1">📊 {language === 'ro' ? 'Calculează:' : 'Calculate:'}</div>
          <div className="font-body font-medium text-[15px] text-[#F0F0F5]">{formula}</div>
        </div>
      )}

      {/* Options */}
      <AnswerOptions
        options={options}
        selected={selected}
        submitted={submitted}
        correct={exercise.correct}
        onSelect={setSelected}
        shaking={shaking}
      />

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
