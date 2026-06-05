import { useState, useRef } from 'react'
import { L } from '../../hooks/useLanguage'
import { FeedbackBlock, XpFloat, DoneButton } from './FeedbackBlock'

export default function DragAndRank({ exercise, onAnswer, answered, language, onClose }) {
  const itemsSource = L(exercise.items, language)
  // initialOrder shuffles items for display
  const initial = (exercise.initialOrder || [0, 1, 2]).map(i => itemsSource[i])

  const [items, setItems] = useState(initial)
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [showXp, setShowXp] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  // For tap-to-swap on mobile
  const [tapped, setTapped] = useState(null)

  const question = L(exercise.question, language)
  const explanation = L(exercise.explanation, language)
  const correctItems = itemsSource // correct order = items array order

  const handleDragStart = (e, i) => {
    setDragIndex(i)
    e.dataTransfer.effectAllowed = 'move'
  }
  const handleDragOver = (e, i) => {
    e.preventDefault()
    setDragOverIndex(i)
  }
  const handleDrop = (e, i) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === i) { setDragIndex(null); setDragOverIndex(null); return }
    const next = [...items]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(i, 0, moved)
    setItems(next)
    setDragIndex(null)
    setDragOverIndex(null)
  }
  const handleDragEnd = () => { setDragIndex(null); setDragOverIndex(null) }

  // Tap-to-swap: tap selects an item, tap another item swaps them
  const handleTap = (i) => {
    if (submitted) return
    if (tapped === null) {
      setTapped(i)
    } else {
      if (tapped !== i) {
        const next = [...items]
        ;[next[tapped], next[i]] = [next[i], next[tapped]]
        setItems(next)
      }
      setTapped(null)
    }
  }

  const handleSubmit = () => {
    const isCorrect = items.every((item, i) => item === correctItems[i])
    setCorrect(isCorrect)
    setSubmitted(true)
    if (isCorrect) {
      setShowXp(true)
      setTimeout(() => setShowXp(false), 900)
      onAnswer(exercise.id, true, exercise.xp)
    } else {
      onAnswer(exercise.id, false, 0)
    }
  }

  if (answered) return null

  const isDragging = dragIndex !== null

  return (
    <div className="relative">
      {showXp && <XpFloat xp={exercise.xp} />}

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[2.5rem]">{exercise.sceneIcon}</span>
        <p className="font-body font-medium text-[16px] text-[#F0F0F5] leading-snug">{question}</p>
      </div>

      <p className="font-body font-semibold text-[12px] text-[#a89cff] uppercase tracking-wider mb-3">
        {language === 'ro' ? 'Trage sau apasă pentru a reordona:' : 'Drag or tap to reorder:'}
      </p>

      {/* Draggable items */}
      <div className="flex flex-col gap-2">
        {items.map((item, i) => {
          const isTapped = tapped === i
          const isDraggedItem = dragIndex === i
          const isDragTarget = dragOverIndex === i && dragIndex !== i

          let bg = 'rgba(255,255,255,0.04)'
          let border = '1px solid rgba(255,255,255,0.08)'
          let color = '#C8C8D4'

          if (submitted) {
            if (item === correctItems[i]) {
              bg = 'rgba(0,212,170,0.1)'; border = '1px solid rgba(0,212,170,0.35)'; color = '#00D4AA'
            } else {
              bg = 'rgba(255,77,106,0.08)'; border = '1px solid rgba(255,77,106,0.25)'; color = '#FF4D6A'
            }
          } else if (isTapped) {
            bg = 'rgba(108,99,255,0.15)'; border = '1px solid rgba(108,99,255,0.5)'; color = '#a89cff'
          } else if (isDragTarget) {
            bg = 'rgba(108,99,255,0.1)'; border = '1px dashed rgba(108,99,255,0.5)'
          }

          return (
            <div
              key={item}
              draggable={!submitted}
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTap(i)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-body text-[14px] min-h-[52px] select-none transition-all duration-150 ${
                isDraggedItem ? 'opacity-50 scale-95' : isDragTarget ? '-translate-y-1' : ''
              }`}
              style={{
                background: bg,
                border,
                color,
                cursor: submitted ? 'default' : 'grab',
              }}
            >
              {/* Rank number */}
              <span
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-body font-semibold text-[13px]"
                style={{
                  background: submitted
                    ? (item === correctItems[i] ? 'rgba(0,212,170,0.2)' : 'rgba(255,77,106,0.2)')
                    : isTapped ? 'rgba(108,99,255,0.25)' : 'rgba(255,255,255,0.06)',
                  color: submitted
                    ? (item === correctItems[i] ? '#00D4AA' : '#FF4D6A')
                    : isTapped ? '#a89cff' : '#7B7D8E',
                }}
              >
                {submitted
                  ? (item === correctItems[i] ? '✓' : '✗')
                  : i + 1}
              </span>

              {/* Drag handle icon */}
              {!submitted && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#7B7D8E" className="flex-shrink-0">
                  <circle cx="9" cy="5"  r="1.5"/><circle cx="15" cy="5"  r="1.5"/>
                  <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
                  <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
                </svg>
              )}

              <span className="flex-1 leading-snug">{item}</span>
            </div>
          )
        })}
      </div>

      {submitted && (
        <FeedbackBlock isCorrect={correct} explanation={explanation} language={language} />
      )}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="btn-accent mt-4 w-full py-3 rounded-xl font-body font-semibold text-[14px] text-white min-h-[48px]"
        >
          {language === 'ro' ? 'Verifică ordinea' : 'Check order'}
        </button>
      ) : (
        <DoneButton onClose={onClose} language={language} />
      )}
    </div>
  )
}
