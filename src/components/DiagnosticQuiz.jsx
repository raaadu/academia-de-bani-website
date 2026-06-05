import { useState } from 'react'
import { EXERCISES, DIAGNOSTIC_QUESTION_IDS } from '../data/exercises'
import { useLanguage, L } from '../hooks/useLanguage'

const DIAGNOSTIC_QUESTIONS = DIAGNOSTIC_QUESTION_IDS.map(id => EXERCISES.find(e => e.id === id))

function getScoreMessage(score, t) {
  if (score <= 40) return { text: t('diagnostic.msg0_40'), color: '#7B7D8E' }
  if (score <= 70) return { text: t('diagnostic.msg41_70'), color: '#6C63FF' }
  return { text: t('diagnostic.msg71_100'), color: '#00D4AA' }
}

export default function DiagnosticQuiz({ onComplete, isFinal = false }) {
  const { language, t } = useLanguage()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)

  const q = DIAGNOSTIC_QUESTIONS[step]
  const question = L(q.question, language)
  const options = Array.isArray(q.options) ? q.options : L(q.options, language)
  const explanation = L(q.explanation, language)

  const handleAnswer = () => {
    if (selected === null) return
    setSubmitted(true)
  }

  const handleNext = () => {
    const isCorrect = selected === q.correct
    const newAnswers = { ...answers, [q.id]: isCorrect }
    setAnswers(newAnswers)

    if (step < DIAGNOSTIC_QUESTIONS.length - 1) {
      setStep(s => s + 1)
      setSelected(null)
      setSubmitted(false)
    } else {
      const correct = Object.values(newAnswers).filter(Boolean).length
      const finalScore = Math.round((correct / DIAGNOSTIC_QUESTIONS.length) * 100)
      setScore(finalScore)
      setDone(true)
    }
  }

  if (done) {
    const msg = getScoreMessage(score, t)
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
          style={{ background: 'rgba(108,99,255,0.12)', border: '2px solid rgba(108,99,255,0.3)', boxShadow: '0 0 32px rgba(108,99,255,0.2)' }}
        >
          <span className="font-syne font-extrabold text-[32px] text-[#6C63FF]">{score}</span>
        </div>
        <h3 className="font-syne font-bold text-[22px] text-[#F0F0F5] mb-2">
          {isFinal ? t('diagnostic.finalTitle') : t('diagnostic.baseScore', score)}
        </h3>
        <p className="font-dm text-[14px] mb-6" style={{ color: msg.color }}>{msg.text}</p>
        <button onClick={() => onComplete(score)}
          className="btn-accent px-8 py-3 rounded-xl font-dm font-medium text-[14px] text-white min-h-[48px]"
        >
          {isFinal ? t('diagnostic.viewProgress') : t('diagnostic.startLearning')}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-syne font-bold text-[19px] md:text-[20px] text-[#F0F0F5] mb-1">
          {isFinal ? t('diagnostic.finalTitle') : t('diagnostic.title')}
        </h3>
        <p className="font-dm text-[13px] text-[#7B7D8E] mb-4">
          {isFinal ? t('diagnostic.finalSubtitle') : t('diagnostic.subtitle')}
        </p>
        <div className="flex gap-2 items-center">
          {DIAGNOSTIC_QUESTIONS.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{ width: i === step ? '24px' : '8px', height: '8px', background: i < step ? '#6C63FF' : i === step ? '#6C63FF' : 'rgba(255,255,255,0.1)' }}
            />
          ))}
          <span className="ml-2 text-[12px] font-dm text-[#7B7D8E]">{step + 1}/{DIAGNOSTIC_QUESTIONS.length}</span>
        </div>
      </div>

      <p className="font-dm text-[15px] text-[#F0F0F5] leading-relaxed mb-5">{question}</p>

      <div className="flex flex-col gap-2 mb-5">
        {options.map((opt, i) => {
          let style = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#C8C8D4' }
          if (selected === i) {
            if (!submitted) style = { background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.4)', color: '#a89cff' }
            else if (i === q.correct) style = { background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.4)', color: '#00D4AA' }
            else style = { background: 'rgba(255,77,106,0.12)', border: '1px solid rgba(255,77,106,0.4)', color: '#FF4D6A' }
          } else if (submitted && i === q.correct) {
            style = { background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.25)', color: '#00D4AA' }
          }
          return (
            <button key={i} disabled={submitted} onClick={() => setSelected(i)}
              className="w-full text-left px-4 py-3 rounded-xl font-dm text-[14px] transition-all duration-200 min-h-[48px]"
              style={style}
            >
              <span className="text-[#7B7D8E] mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          )
        })}
      </div>

      {submitted && (
        <div className="px-4 py-3 rounded-xl mb-4"
          style={{
            background: selected === q.correct ? 'rgba(0,212,170,0.08)' : 'rgba(255,77,106,0.08)',
            border: selected === q.correct ? '1px solid rgba(0,212,170,0.2)' : '1px solid rgba(255,77,106,0.2)',
          }}
        >
          <p className="font-dm text-[13px] leading-relaxed" style={{ color: selected === q.correct ? '#00D4AA' : '#FF4D6A' }}>
            {selected === q.correct ? t('diagnostic.correctPrefix') : t('diagnostic.wrongPrefix')}{explanation}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button onClick={handleAnswer} disabled={selected === null}
            className="btn-accent px-6 py-2.5 rounded-xl font-dm font-medium text-[14px] text-white min-h-[48px] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {t('diagnostic.verify')}
          </button>
        ) : (
          <button onClick={handleNext}
            className="btn-accent px-6 py-2.5 rounded-xl font-dm font-medium text-[14px] text-white min-h-[48px]"
          >
            {step < DIAGNOSTIC_QUESTIONS.length - 1 ? t('diagnostic.next') : t('diagnostic.viewResult')}
          </button>
        )}
      </div>
    </div>
  )
}
