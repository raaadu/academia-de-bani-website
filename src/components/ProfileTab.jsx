import { useState } from 'react'
import { EXERCISES } from '../data/exercises'
import { useLanguage } from '../hooks/useLanguage'

function SignOutSheet({ onConfirm, onCancel, t }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8,9,14,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onCancel}
      />
      <div
        className="relative w-full md:max-w-sm slide-up-sheet fade-in-up"
        style={{
          background: 'rgba(22,24,32,0.97)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,77,106,0.2)',
          borderRadius: '24px 24px 0 0',
          padding: '32px 24px 40px',
          boxShadow: '0 -16px 64px rgba(0,0,0,0.5)',
        }}
        ref={(el) => {
          if (el && window.matchMedia('(min-width: 768px)').matches) {
            el.style.borderRadius = '20px'
          }
        }}
      >
        <div className="md:hidden flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-[#7B7D8E]" />
        </div>
        <h2 className="font-syne font-bold text-[20px] text-[#F0F0F5] mb-2">
          {t('profile.signOutConfirmTitle')}
        </h2>
        <p className="font-dm text-[14px] text-[#7B7D8E] mb-6 leading-relaxed">
          {t('profile.signOutConfirmBody')}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl font-dm font-medium text-[14px] text-[#7B7D8E] min-h-[48px] transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t('profile.signOutCancel')}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-dm font-semibold text-[14px] text-white min-h-[48px] transition-all duration-200"
            style={{ background: '#FF4D6A', boxShadow: '0 0 20px rgba(255,77,106,0.35)' }}
          >
            {t('profile.signOut')}
          </button>
        </div>
      </div>
    </div>
  )
}

const BADGE_IDS = ['primul-pas', 'economist', 'detectiv-financiar', 'scorpion-de-foc', 'maestru']
const BADGE_EMOJIS = {
  'primul-pas': '🏦',
  'economist': '📈',
  'detectiv-financiar': '🔍',
  'scorpion-de-foc': '🔥',
  'maestru': '🏆',
}

function StatCard({ label, value, sub, accentColor }) {
  return (
    <div className="rounded-2xl p-5"
      style={{ background: 'rgba(15,17,23,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="font-syne font-extrabold text-[28px] md:text-[32px] leading-none mb-1" style={{ color: accentColor || '#F0F0F5' }}>
        {value}
      </div>
      <div className="font-dm text-[13px] text-[#F0F0F5] font-medium mb-0.5">{label}</div>
      {sub && <div className="font-dm text-[11px] text-[#7B7D8E]">{sub}</div>}
    </div>
  )
}

function InitialsAvatar({ name, size = 64 }) {
  const initials = name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : '??'
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size, height: size,
        background: 'rgba(108,99,255,0.15)',
        border: '2px solid rgba(108,99,255,0.4)',
        boxShadow: '0 0 24px rgba(108,99,255,0.25)',
        fontSize: size / 2.8,
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        color: '#6C63FF',
      }}
    >
      {initials}
    </div>
  )
}

export default function ProfileTab({ appState, onSignOut }) {
  const { language, setLanguage, t } = useLanguage()
  const { user, setUser, xp, completedLessons, answeredExercises, streak, earnedBadges, baselineScore, finalScore, getLevel } = appState
  const [editing, setEditing] = useState(false)
  const [showSignOutSheet, setShowSignOutSheet] = useState(false)
  const [editName, setEditName] = useState(user?.name || '')
  const [editCohort, setEditCohort] = useState(user?.cohort || '')

  const level = getLevel()
  const levelName = t(`levelNames.${level.name}`)
  const levelNextName = level.next ? t(`levelNames.${level.next}`) : null
  const answeredCount = Object.keys(answeredExercises).length
  const currentScore = finalScore !== null ? finalScore : baselineScore
  const scoreDelta = finalScore !== null && baselineScore !== null ? finalScore - baselineScore : null
  const scorePercent = scoreDelta !== null && baselineScore > 0 ? Math.round((scoreDelta / baselineScore) * 100) : null

  const handleSave = () => {
    if (!editName.trim()) return
    setUser({ ...user, name: editName.trim(), cohort: editCohort.trim() || t('onboarding.independent') })
    setEditing(false)
  }

  if (!user) return null

  return (
    <div className="px-4 py-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="font-syne font-extrabold text-[36px] md:text-[48px] text-[#F0F0F5] leading-none mb-6 md:mb-8">
        {t('profile.heading')}
      </h1>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
        {/* Left: identity */}
        <div className="rounded-2xl p-5 md:p-6"
          style={{ background: 'rgba(15,17,23,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-start gap-4 mb-5">
            <InitialsAvatar name={user.name} size={60} />
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg font-dm text-[14px] text-[#F0F0F5] outline-none min-h-[44px]"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.4)' }}
                    placeholder={t('profile.editName')}
                  />
                  <input
                    value={editCohort}
                    onChange={e => setEditCohort(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg font-dm text-[14px] text-[#F0F0F5] outline-none min-h-[44px]"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.4)' }}
                    placeholder={t('profile.editCohort')}
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn-accent px-4 py-2 rounded-lg font-dm text-[13px] text-white min-h-[40px]">
                      {t('profile.save')}
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="px-4 py-2 rounded-lg font-dm text-[13px] text-[#7B7D8E] min-h-[40px]"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {t('profile.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-syne font-bold text-[22px] md:text-[24px] text-[#F0F0F5] leading-tight mb-1">{user.name}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-dm"
                      style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', color: '#a89cff' }}
                    >
                      {user.cohort}
                    </div>
                    <button onClick={() => setEditing(true)}
                      className="text-[#7B7D8E] hover:text-[#F0F0F5] transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Edit"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Language toggle — Change 4 */}
                  <div className="flex gap-2 mt-3">
                    {[{ code: 'ro', flag: '🇷🇴' }, { code: 'en', flag: '🇬🇧' }].map(({ code, flag }) => (
                      <button
                        key={code}
                        onClick={() => setLanguage(code)}
                        className="px-3 py-1.5 rounded-full font-dm text-[13px] transition-all duration-200 min-h-[32px]"
                        style={{
                          background: language === code ? 'rgba(108,99,255,0.15)' : 'transparent',
                          border: language === code ? '1px solid rgba(108,99,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                          color: language === code ? '#a89cff' : '#7B7D8E',
                        }}
                      >
                        {flag}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Level progress */}
          <div className="p-4 rounded-xl" style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.1)' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-dm text-[13px] text-[#F0F0F5] font-medium">{levelName}</span>
              {level.next && <span className="font-dm text-[11px] text-[#7B7D8E]">{xp} / {level.needed} XP</span>}
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full progress-bar-gradient rounded-full transition-all duration-700"
                style={{ width: level.needed ? `${Math.min((xp / level.needed) * 100, 100)}%` : '100%' }}
              />
            </div>
            {level.next && (
              <div className="text-[11px] font-dm text-[#7B7D8E] mt-1.5">
                {t('profile.nextLevel', levelNextName, level.needed - xp)}
              </div>
            )}
          </div>
        </div>

        {/* Right: stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label={t('profile.totalXp')} value={xp} sub={levelName} accentColor="#6C63FF" />
          <StatCard label={t('profile.lessons')} value={`${completedLessons.length}/3`} sub={t('profile.lessonsCompleted')} accentColor="#00D4AA" />
          <StatCard label={t('profile.exercises')} value={`${answeredCount}/${EXERCISES.length}`} sub={t('profile.exercisesSolved')} accentColor="#a89cff" />
          <StatCard label={t('profile.streak')} value={`${streak}${t('profile.streakUnit')}`} sub={t('profile.streakDays')} accentColor="#FF4D6A" />
        </div>
      </div>

      {/* Impact card */}
      {(baselineScore !== null || currentScore !== null) && (
        <div className="rounded-2xl p-5 md:p-6 mb-5 md:mb-6"
          style={{ background: 'rgba(15,17,23,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,212,170,0.15)' }}
        >
          <div className="font-syne font-bold text-[13px] text-[#00D4AA] tracking-wider mb-4">{t('profile.impactTitle')}</div>
          <div className="flex items-center justify-around gap-4 flex-wrap">
            <div className="text-center">
              <div className="font-syne font-extrabold text-[36px] md:text-[40px] text-[#7B7D8E]">{baselineScore ?? '—'}</div>
              <div className="font-dm text-[12px] text-[#7B7D8E]">{t('profile.initialScore')}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B7D8E" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <div className="text-center">
              <div className="font-syne font-extrabold text-[36px] md:text-[40px] text-[#F0F0F5]">{currentScore ?? '—'}</div>
              <div className="font-dm text-[12px] text-[#7B7D8E]">{t('profile.currentScore')}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B7D8E" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <div className="text-center">
              <div className="font-syne font-extrabold text-[36px] md:text-[40px]"
                style={{ color: scoreDelta !== null && scoreDelta >= 0 ? '#00D4AA' : scoreDelta !== null ? '#FF4D6A' : '#7B7D8E' }}
              >
                {scoreDelta !== null ? (scoreDelta >= 0 ? '+' : '') + scoreDelta : '—'}
              </div>
              <div className="font-dm text-[12px] text-[#7B7D8E]">{t('profile.deltaLabel')}</div>
            </div>
          </div>
          {scorePercent !== null && (
            <p className="text-center font-dm text-[13px] text-[#7B7D8E] mt-4">
              {t('profile.improvedBy', scorePercent)}
            </p>
          )}
        </div>
      )}

      {/* Badges */}
      <div className="rounded-2xl p-5 md:p-6"
        style={{ background: 'rgba(15,17,23,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="font-syne font-bold text-[13px] text-[#7B7D8E] tracking-wider mb-4">{t('profile.badges')}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BADGE_IDS.map(badgeId => {
            const earned = earnedBadges.includes(badgeId)
            const badgeData = t(`profile.badgesData.${badgeId}`)
            const name = typeof badgeData === 'object' ? badgeData.name : badgeId
            const desc = typeof badgeData === 'object' ? badgeData.desc : ''
            return (
              <div key={badgeId}
                className="flex flex-col items-center gap-2 p-4 rounded-xl relative overflow-hidden"
                style={{
                  background: earned ? 'rgba(108,99,255,0.08)' : 'rgba(255,255,255,0.02)',
                  border: earned ? '1px solid rgba(108,99,255,0.25)' : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: earned ? '0 0 20px rgba(108,99,255,0.15)' : 'none',
                  filter: earned ? 'none' : 'grayscale(1)',
                  opacity: earned ? 1 : 0.4,
                }}
              >
                <span className="text-[32px]">{BADGE_EMOJIS[badgeId]}</span>
                <span className="font-dm text-[11px] text-center text-[#F0F0F5] font-medium leading-tight">{name}</span>
                <span className="font-dm text-[10px] text-center text-[#7B7D8E] leading-tight">{desc}</span>
                {!earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B7D8E" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sign Out */}
      <button
        onClick={() => setShowSignOutSheet(true)}
        className="w-full py-3.5 rounded-xl font-dm font-medium text-[14px] min-h-[48px] transition-all duration-200"
        style={{
          background: 'transparent',
          border: '1px solid #FF4D6A',
          color: '#FF4D6A',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,77,106,0.08)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        {t('profile.signOut')}
      </button>

      {showSignOutSheet && (
        <SignOutSheet
          t={t}
          onCancel={() => setShowSignOutSheet(false)}
          onConfirm={() => {
            setShowSignOutSheet(false)
            onSignOut?.()
          }}
        />
      )}
    </div>
  )
}
