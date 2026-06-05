import { useState, useEffect, useRef } from 'react'
import { useLanguage, L } from '../hooks/useLanguage'

function ConceptChip({ word }) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const definition = t(`definitions.${word}`)
  return (
    <span className="concept-chip" onClick={() => setOpen(o => !o)}>
      {word}
      {open && (
        <span className="tooltip" style={{ minWidth: '180px' }}>{definition}</span>
      )}
    </span>
  )
}

function renderText(text) {
  const parts = text.split(/(<chip>[^<]+<\/chip>)/g)
  return parts.map((part, i) => {
    const match = part.match(/<chip>([^<]+)<\/chip>/)
    if (match) return <ConceptChip key={i} word={match[1]} />
    return <span key={i}>{part}</span>
  })
}

function SectionContent({ content, language }) {
  return (
    <div className="flex flex-col gap-4">
      {content.map((block, i) => {
        if (block.type === 'text') {
          return (
            <p key={i} className="font-dm text-[15px] text-[#C8C8D4] leading-relaxed">
              {renderText(L(block.text, language))}
            </p>
          )
        }
        if (block.type === 'highlight') {
          return (
            <div key={i} className="px-4 py-3 rounded-xl" style={{ background: 'rgba(108,99,255,0.08)', borderLeft: '3px solid #6C63FF' }}>
              <p className="font-dm text-[14px] text-[#a89cff] leading-relaxed">
                {renderText(L(block.text, language))}
              </p>
            </div>
          )
        }
        if (block.type === 'example') {
          return (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.15)' }}>
              <div className="text-[11px] font-syne font-bold text-[#00D4AA] tracking-wider mb-2">
                {L(block.title, language)}
              </div>
              <p className="font-dm text-[14px] text-[#C8C8D4] leading-relaxed whitespace-pre-line">
                {L(block.text, language)}
              </p>
            </div>
          )
        }
        if (block.type === 'comparison') {
          const points = (col) => Array.isArray(col.points) ? col.points : L(col.points, language)
          return (
            <div key={i} className="grid grid-cols-2 gap-3">
              {[block.left, block.right].map((col, ci) => (
                <div key={ci} className="rounded-xl p-3 md:p-4"
                  style={{
                    background: ci === 0 ? 'rgba(108,99,255,0.06)' : 'rgba(0,212,170,0.06)',
                    border: ci === 0 ? '1px solid rgba(108,99,255,0.15)' : '1px solid rgba(0,212,170,0.15)',
                  }}
                >
                  <div className="text-[11px] font-syne font-bold tracking-wider mb-3" style={{ color: ci === 0 ? '#a89cff' : '#00D4AA' }}>
                    {L(col.label, language)}
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {points(col).map((p, pi) => (
                      <li key={pi} className="text-[12px] md:text-[13px] font-dm text-[#C8C8D4] flex gap-2">
                        <span style={{ color: ci === 0 ? '#6C63FF' : '#00D4AA' }}>·</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        }
        if (block.type === 'list') {
          const items = Array.isArray(block.items) ? block.items : L(block.items, language)
          return (
            <ul key={i} className="flex flex-col gap-2">
              {items.map((item, li) => (
                <li key={li} className="font-dm text-[13px] md:text-[14px] text-[#C8C8D4] leading-relaxed px-4 py-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return null
      })}
    </div>
  )
}

function CheckpointQuiz({ checkpoint, language, t, onPass }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const isCorrect = selected === checkpoint.correct
  const question = L(checkpoint.question, language)
  const options = Array.isArray(checkpoint.options) ? checkpoint.options : L(checkpoint.options, language)
  const explanation = L(checkpoint.explanation, language)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    if (selected === checkpoint.correct) setTimeout(onPass, 1200)
  }

  return (
    <div className="rounded-2xl p-5 md:p-6 my-6"
      style={{ background: 'rgba(22,24,32,0.8)', border: '1px solid rgba(108,99,255,0.2)', boxShadow: '0 0 32px rgba(108,99,255,0.08)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-syne font-bold" style={{ background: '#6C63FF', color: 'white' }}>?</div>
        <span className="text-[12px] font-syne font-bold text-[#6C63FF] tracking-wider uppercase">{t('lessonPanel.checkpoint')}</span>
      </div>
      <p className="font-dm text-[15px] text-[#F0F0F5] mb-5 leading-relaxed">{question}</p>
      <div className="flex flex-col gap-2 mb-4">
        {options.map((opt, i) => {
          let style = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#C8C8D4' }
          if (selected === i) {
            if (!submitted) style = { background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.4)', color: '#a89cff' }
            else if (isCorrect) style = { background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.4)', color: '#00D4AA' }
            else style = { background: 'rgba(255,77,106,0.12)', border: '1px solid rgba(255,77,106,0.4)', color: '#FF4D6A' }
          } else if (submitted && i === checkpoint.correct) {
            style = { background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.3)', color: '#00D4AA' }
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
      {!submitted ? (
        <button onClick={handleSubmit} disabled={selected === null}
          className="btn-accent px-6 py-2.5 rounded-xl font-dm font-medium text-[14px] text-white min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {t('lessonPanel.verify')}
        </button>
      ) : (
        <div className="px-4 py-3 rounded-xl"
          style={{ background: isCorrect ? 'rgba(0,212,170,0.08)' : 'rgba(255,77,106,0.08)', border: isCorrect ? '1px solid rgba(0,212,170,0.2)' : '1px solid rgba(255,77,106,0.2)' }}
        >
          <p className="font-dm text-[13px] leading-relaxed" style={{ color: isCorrect ? '#00D4AA' : '#FF4D6A' }}>
            {isCorrect ? t('lessonPanel.correct') : t('lessonPanel.wrong')} {explanation}
          </p>
          {!isCorrect && (
            <button onClick={() => { setSelected(null); setSubmitted(false) }}
              className="mt-3 text-[12px] font-dm font-medium text-[#6C63FF] underline underline-offset-2"
            >
              {t('lessonPanel.tryAgain')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function XpAnimation({ xp, t }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full mb-6"
        style={{ background: 'rgba(0,212,170,0.12)', border: '2px solid rgba(0,212,170,0.4)', boxShadow: '0 0 48px rgba(0,212,170,0.3)' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" strokeWidth="3" stroke="#00D4AA" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="font-syne font-extrabold text-[28px] md:text-[32px] text-[#F0F0F5] mb-2">{t('lessonPanel.completed')}</h2>
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-4"
        style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.35)', boxShadow: '0 0 24px rgba(108,99,255,0.2)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#6C63FF">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span className="font-syne font-bold text-[20px] text-[#6C63FF]">+{xp} XP</span>
      </div>
      <p className="font-dm text-[14px] text-[#7B7D8E]">{t('lessonPanel.badgeNote')}</p>
    </div>
  )
}

export default function LessonPanel({ lesson, appState, onClose }) {
  const { language, t } = useLanguage()
  const [phase, setPhase] = useState('part1')
  const [currentSection, setCurrentSection] = useState(0)
  const contentRef = useRef(null)

  // Close on Escape key or backdrop click
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const allSections1 = lesson.sections
  const allSections2 = lesson.sections2 || []
  const sections = phase === 'part1' ? allSections1 : allSections2

  const totalSections = allSections1.length + allSections2.length
  const progress = phase === 'done' ? 100
    : phase === 'part2' ? ((allSections1.length + currentSection + 1) / totalSections) * 100
    : phase === 'checkpoint' ? (allSections1.length / totalSections) * 100
    : ((currentSection + 1) / totalSections) * 100

  const handleNext = () => {
    if (contentRef.current) contentRef.current.scrollTop = 0
    if (phase === 'part1') {
      if (currentSection < allSections1.length - 1) setCurrentSection(c => c + 1)
      else { setPhase('checkpoint'); setCurrentSection(0) }
    } else if (phase === 'part2') {
      if (currentSection < allSections2.length - 1) setCurrentSection(c => c + 1)
      else {
        setPhase('done')
        appState.completeLesson(lesson.id)
        appState.addXp(lesson.xp)
        appState.earnBadge(lesson.badge.id)
      }
    }
  }

  const currentSectionData = (phase === 'part1' || phase === 'part2') ? sections[currentSection] : null

  const nextBtnLabel = (phase === 'part1' && currentSection === allSections1.length - 1)
    ? t('lessonPanel.checkpointBtn')
    : (phase === 'part2' && currentSection === allSections2.length - 1)
      ? t('lessonPanel.finishBtn')
      : t('lessonPanel.continueBtn')

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: 'rgba(8,9,14,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel: full-screen slide-up on mobile, side panel on desktop */}
      <div
        className="absolute bottom-0 left-0 right-0 md:bottom-auto md:top-0 md:left-auto md:right-0 md:h-full flex flex-col slide-up-full md:slide-in-right"
        style={{
          height: '100%',
          width: '100%',
          maxWidth: '100%',
          background: '#0F1117',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          // Desktop: cap width
        }}
        // Use inline style media query approach via ref
        ref={(el) => {
          if (el) {
            const isMd = window.matchMedia('(min-width: 768px)').matches
            if (isMd) {
              el.style.maxWidth = '640px'
              el.style.borderTop = 'none'
              el.style.borderLeft = '1px solid rgba(255,255,255,0.06)'
              el.style.height = '100%'
            } else {
              el.style.borderRadius = '24px 24px 0 0'
            }
          }
        }}
      >
        {/* Top bar */}
        <div className="flex-shrink-0 px-4 md:px-6 py-4 flex items-center gap-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Mobile: back arrow; Desktop: X close */}
          <button onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#7B7D8E] hover:text-[#F0F0F5] hover:bg-white/[0.06] transition-all flex-shrink-0"
          >
            {/* Back arrow on mobile */}
            <svg className="md:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            {/* X on desktop */}
            <svg className="hidden md:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Title — centered on mobile, left on desktop */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="text-[11px] font-syne font-bold text-[#6C63FF] tracking-wider mb-0.5">
              {t('lessonPanel.lessonOf', lesson.number)}
            </div>
            <h2 className="font-syne font-bold text-[15px] md:text-[16px] text-[#F0F0F5] truncate">
              {L(lesson.title, language)}
            </h2>
          </div>

          <span className="text-[12px] font-dm text-[#7B7D8E] flex-shrink-0">{Math.round(progress)}%</span>
        </div>

        {/* Progress bar */}
        <div className="flex-shrink-0 h-1 bg-white/[0.04]">
          <div className="h-full progress-bar-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 md:py-6" ref={contentRef}>
          {phase === 'done' ? (
            <XpAnimation xp={lesson.xp} t={t} />
          ) : phase === 'checkpoint' ? (
            <CheckpointQuiz checkpoint={lesson.checkpoint} language={language} t={t} onPass={() => { setPhase('part2'); setCurrentSection(0) }} />
          ) : currentSectionData ? (
            <div className="fade-in-up">
              <h3 className="font-syne font-bold text-[20px] md:text-[22px] text-[#F0F0F5] mb-5 md:mb-6">
                {L(currentSectionData.title, language)}
              </h3>
              <SectionContent content={currentSectionData.content} language={language} />
            </div>
          ) : null}
        </div>

        {/* Bottom controls */}
        {phase !== 'done' && phase !== 'checkpoint' && (
          <div className="flex-shrink-0 px-4 md:px-6 py-4 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex gap-1.5">
              {Array.from({ length: totalSections }).map((_, i) => {
                const isActive = phase === 'part1' ? i === currentSection : i === allSections1.length + currentSection
                const isDone = phase === 'part1' ? i < currentSection : i < allSections1.length + currentSection
                return (
                  <div key={i} className="rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? '24px' : '6px',
                      height: '6px',
                      background: isActive ? '#6C63FF' : isDone ? 'rgba(108,99,255,0.4)' : 'rgba(255,255,255,0.1)',
                    }}
                  />
                )
              })}
            </div>
            <button onClick={handleNext} className="btn-accent px-5 md:px-6 py-2.5 rounded-xl font-dm font-medium text-[14px] text-white min-h-[44px]">
              {nextBtnLabel}
            </button>
          </div>
        )}

        {phase === 'done' && (
          <div className="flex-shrink-0 px-4 md:px-6 py-4 flex gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <button onClick={onClose} className="flex-1 py-3 rounded-xl font-dm font-medium text-[14px] text-[#7B7D8E] hover:text-[#F0F0F5] transition-all min-h-[48px]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {t('lessonPanel.backBtn')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
