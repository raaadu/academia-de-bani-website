import { useState } from 'react'
import { L } from '../../hooks/useLanguage'
import { FeedbackBlock, XpFloat, AnswerOptions, DoneButton } from './FeedbackBlock'

export default function DangerDetector({ exercise, onAnswer, answered, language, onClose }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showXp, setShowXp] = useState(false)
  const [shaking, setShaking] = useState(false)

  const isCorrect = selected === exercise.correct
  const options = L(exercise.options, language)
  const question = L(exercise.question, language)
  const explanation = L(exercise.explanation, language)
  const sceneTitle = exercise.sceneTitle ? L(exercise.sceneTitle, language) : ''

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

      {/* Warning header */}
      <div
        className="rounded-t-2xl -mx-6 md:-mx-8 -mt-4 mb-4 px-6 py-4 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #2a1200, #4a1e00)' }}
      >
        <span className="text-[2rem]">⚠️</span>
        <div>
          <div className="font-body font-semibold text-[12px] text-amber-400 uppercase tracking-wider mb-0.5">
            {language === 'ro' ? 'Analizează această ofertă:' : 'Analyze this offer:'}
          </div>
          <div className="font-body font-semibold text-[15px] text-white">{sceneTitle}</div>
        </div>
      </div>

      {/* Evidence card — styled like a suspect document */}
      <div
        className="rounded-xl mb-4 p-4"
        style={{
          background: '#1a1000',
          border: '1px solid rgba(245,158,11,0.35)',
          boxShadow: '0 0 16px rgba(245,158,11,0.08)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[18px]">{exercise.sceneIcon}</span>
          <span className="font-body font-semibold text-[13px] text-amber-400">
            {language === 'ro' ? 'Ofertă detectată' : 'Offer detected'}
          </span>
        </div>
        <p className="font-body text-[13px] text-[#D4C4A0] leading-relaxed">{question}</p>
      </div>

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
