import { useState } from 'react'
import { LESSONS } from '../data/lessons'
import LessonPanel from './LessonPanel'
import { useLanguage, L } from '../hooks/useLanguage'

function LessonCard({ lesson, isCompleted, isLocked, onClick, language, t }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl card-hover cursor-pointer group
        ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{
        background: 'rgba(15,17,23,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isCompleted ? '1px solid rgba(0,212,170,0.25)' : '1px solid rgba(255,255,255,0.06)',
      }}
      onClick={() => !isLocked && onClick()}
    >
      {/* Accent left border on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l"
        style={{ background: isCompleted ? '#00D4AA' : '#6C63FF' }}
      />

      {/* Decorative lesson number */}
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 font-syne font-extrabold text-[80px] leading-none select-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.025)' }}
      >
        {lesson.number}
      </div>

      <div className="p-5 md:p-6 relative z-10">
        {/* Top row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className="text-[11px] font-dm font-medium px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.2)', color: '#a89cff' }}
          >
            {L(lesson.tag, language)}
          </span>
          <span className="text-[11px] font-dm text-[#7B7D8E]">{lesson.duration}</span>
          <div className="ml-auto">
            {isCompleted ? (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.3)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[11px] font-dm font-medium text-[#00D4AA]">{t('lessons.completed')}</span>
              </div>
            ) : isLocked ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B7D8E" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            ) : null}
          </div>
        </div>

        <div className="font-syne font-bold text-[11px] text-[#6C63FF] mb-1 tracking-widest">
          {t('lessons.lessonLabel', lesson.number)}
        </div>

        <h3 className="font-syne font-bold text-[19px] md:text-[20px] text-[#F0F0F5] leading-tight mb-3">
          {L(lesson.title, language)}
        </h3>

        {isLocked && (
          <p className="text-[12px] font-dm text-[#7B7D8E]">
            🔒 {t('lessons.locked')}
          </p>
        )}

        {!isLocked && (
          <div className="flex items-center gap-1.5 mt-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#6C63FF">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-[12px] font-dm text-[#7B7D8E]">+{lesson.xp} XP</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LessonsTab({ appState }) {
  const [openLesson, setOpenLesson] = useState(null)
  const { completedLessons } = appState
  const { language, t } = useLanguage()

  return (
    <div className="px-4 py-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-syne font-extrabold text-[36px] md:text-[48px] text-[#F0F0F5] leading-none mb-2">
          {t('lessons.heading')}
        </h1>
        <p className="font-dm text-[14px] md:text-[15px] text-[#7B7D8E]">
          {t('lessons.subtitle')}
        </p>
      </div>

      {/* Progress summary */}
      <div
        className="flex items-center gap-4 p-4 rounded-xl mb-6 md:mb-8"
        style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)' }}
      >
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <span className="text-[12px] font-dm text-[#7B7D8E]">{t('lessons.totalProgress')}</span>
            <span className="text-[12px] font-dm font-medium text-[#6C63FF]">
              {t('lessons.lessonsCount', completedLessons.length)}
            </span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full progress-bar-gradient rounded-full transition-all duration-700"
              style={{ width: `${(completedLessons.length / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson cards */}
      <div className="grid gap-4">
        {LESSONS.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id)
          const isLocked = idx > 0 && !completedLessons.includes(LESSONS[idx - 1].id)
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isCompleted}
              isLocked={isLocked}
              language={language}
              t={t}
              onClick={() => setOpenLesson(lesson)}
            />
          )
        })}
      </div>

      {openLesson && (
        <LessonPanel
          lesson={openLesson}
          appState={appState}
          onClose={() => setOpenLesson(null)}
        />
      )}
    </div>
  )
}
