import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'

const LOCAL_SEEDS = [
  { name: 'Andrei Moldovan', cohort: 'SOS Iași', xp: 620 },
  { name: 'Maria Ionescu', cohort: 'Casa Bună Cluj', xp: 570 },
  { name: 'Cristina Popa', cohort: 'Împreună Brașov', xp: 510 },
  { name: 'Vlad Dumitrescu', cohort: 'SOS Iași', xp: 475 },
  { name: 'Elena Stoica', cohort: 'Casa Bună Cluj', xp: 440 },
  { name: 'Radu Georgescu', cohort: 'Lumina Timișoara', xp: 385 },
  { name: 'Ioana Marin', cohort: 'Împreună Brașov', xp: 320 },
  { name: 'Mihai Stancu', cohort: 'Lumina Timișoara', xp: 265 },
  { name: 'Alina Barbu', cohort: 'SOS Iași', xp: 195 },
]

const NATIONAL_SEEDS = [
  { name: 'Andrei Moldovan', cohort: 'SOS Iași', xp: 1420 },
  { name: 'Diana Constantin', cohort: 'Pro Activ București', xp: 1380 },
  { name: 'Alexandru Radu', cohort: 'Viitor Plus Galați', xp: 1305 },
  { name: 'Maria Ionescu', cohort: 'Casa Bună Cluj', xp: 1240 },
  { name: 'Cristina Popa', cohort: 'Împreună Brașov', xp: 1190 },
  { name: 'Bogdan Neagu', cohort: 'Pro Activ București', xp: 1135 },
  { name: 'Vlad Dumitrescu', cohort: 'SOS Iași', xp: 1090 },
  { name: 'Larisa Toma', cohort: 'Speranța Craiova', xp: 1020 },
  { name: 'Elena Stoica', cohort: 'Casa Bună Cluj', xp: 960 },
  { name: 'Gabriel Nistor', cohort: 'Viitor Plus Galați', xp: 910 },
  { name: 'Radu Georgescu', cohort: 'Lumina Timișoara', xp: 855 },
  { name: 'Oana Filip', cohort: 'Speranța Craiova', xp: 800 },
  { name: 'Ioana Marin', cohort: 'Împreună Brașov', xp: 740 },
  { name: 'Sorin Apostol', cohort: 'Pro Activ București', xp: 685 },
  { name: 'Mihai Stancu', cohort: 'Lumina Timișoara', xp: 620 },
  { name: 'Raluca Dănilă', cohort: 'Viitor Plus Galați', xp: 555 },
  { name: 'Dan Muscalu', cohort: 'Speranța Craiova', xp: 490 },
  { name: 'Alina Barbu', cohort: 'SOS Iași', xp: 415 },
  { name: 'Teodora Lungu', cohort: 'Pro Activ București', xp: 340 },
  { name: 'Liviu Preda', cohort: 'Lumina Timișoara', xp: 260 },
]

function getLevelName(xp, t) {
  if (xp < 100) return t('levelNames.Novice')
  if (xp < 300) return t('levelNames.Explorator')
  if (xp < 600) return t('levelNames.Student')
  if (xp < 1000) return t('levelNames.Analist')
  if (xp < 1500) return t('levelNames.Economist')
  return t('levelNames.Expert')
}

function RankBadge({ rank }) {
  if (rank === 1) return <span className="text-[20px]">🥇</span>
  if (rank === 2) return <span className="text-[20px]">🥈</span>
  if (rank === 3) return <span className="text-[20px]">🥉</span>
  return <span className="font-syne font-bold text-[13px] w-7 text-center" style={{ color: '#7B7D8E' }}>{rank}</span>
}

function LeaderboardRow({ rank, name, cohort, xp, isUser, t }) {
  const isTop3 = rank <= 3
  return (
    <div
      className="flex items-center gap-3 md:gap-4 px-3 md:px-4 rounded-xl transition-all duration-200 relative"
      style={{
        minHeight: isTop3 ? '60px' : '56px',
        background: isUser ? 'rgba(108,99,255,0.1)' : isTop3 ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: isUser ? '1px solid rgba(108,99,255,0.25)' : isTop3 ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        borderLeft: isUser ? '3px solid #6C63FF' : undefined,
        marginBottom: '2px',
      }}
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-8 flex justify-center">
        <RankBadge rank={rank} />
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-syne font-bold text-[12px]"
        style={{
          background: isUser ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.05)',
          color: isUser ? '#6C63FF' : '#7B7D8E',
          border: isUser ? '1px solid rgba(108,99,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-dm font-medium text-[13px] md:text-[14px] truncate" style={{ color: isUser ? '#F0F0F5' : '#C8C8D4' }}>
          {name} {isUser && <span className="text-[11px] text-[#6C63FF] font-dm">{t('leaderboard.you')}</span>}
        </div>
        {/* Cohort hidden on mobile */}
        <div className="hidden md:block font-dm text-[11px] text-[#7B7D8E] truncate">{cohort}</div>
      </div>

      {/* XP + level */}
      <div className="text-right flex-shrink-0">
        <div className="font-syne font-bold text-[14px] md:text-[15px]" style={{ color: isUser ? '#6C63FF' : '#F0F0F5' }}>
          {xp.toLocaleString()} XP
        </div>
        <div className="font-dm text-[11px] text-[#7B7D8E]">{getLevelName(xp, t)}</div>
      </div>
    </div>
  )
}

export default function Leaderboard({ appState }) {
  const { user, xp } = appState
  const { t } = useLanguage()
  const [view, setView] = useState('local')

  const seeds = view === 'local' ? LOCAL_SEEDS : NATIONAL_SEEDS

  const buildRanking = (list) => {
    const userEntry = user ? { name: user.name, cohort: user.cohort, xp, isUser: true } : null
    const allEntries = userEntry ? [...list.map(e => ({ ...e, isUser: false })), userEntry] : list.map(e => ({ ...e, isUser: false }))
    allEntries.sort((a, b) => b.xp - a.xp)
    return allEntries.map((e, i) => ({ ...e, rank: i + 1 }))
  }

  const ranked = buildRanking(seeds)

  return (
    <div className="px-4 py-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-syne font-extrabold text-[36px] md:text-[48px] text-[#F0F0F5] leading-none mb-1">
          {t('leaderboard.heading')}
        </h1>
        <p className="font-dm text-[13px] md:text-[14px] text-[#7B7D8E]">{t('leaderboard.subtitle')}</p>
      </div>

      {/* Toggle */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[{ id: 'local', labelKey: 'leaderboard.myGroup' }, { id: 'national', labelKey: 'leaderboard.national' }].map(tog => (
          <button key={tog.id} onClick={() => setView(tog.id)}
            className="px-4 md:px-5 py-2 rounded-lg font-dm text-[13px] font-medium transition-all duration-200 min-h-[40px]"
            style={{
              background: view === tog.id ? '#6C63FF' : 'transparent',
              color: view === tog.id ? 'white' : '#7B7D8E',
              boxShadow: view === tog.id ? '0 0 16px rgba(108,99,255,0.3)' : 'none',
            }}
          >
            {t(tog.labelKey)}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
        {ranked.slice(0, 3).map(entry => (
          <div key={entry.name}
            className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl text-center"
            style={{
              background: entry.isUser ? 'rgba(108,99,255,0.12)' : 'rgba(15,17,23,0.7)',
              border: entry.isUser ? '1px solid rgba(108,99,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span className="text-[24px] md:text-[28px]">{entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}</span>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-[12px]"
              style={{ background: entry.isUser ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.05)', color: entry.isUser ? '#6C63FF' : '#7B7D8E' }}
            >
              {entry.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div className="font-dm text-[11px] md:text-[12px] text-[#F0F0F5] font-medium leading-tight truncate w-full">
              {entry.name.split(' ')[0]}
            </div>
            <div className="font-syne font-bold text-[13px] md:text-[14px]" style={{ color: entry.isUser ? '#6C63FF' : '#F0F0F5' }}>
              {entry.xp.toLocaleString()} XP
            </div>
          </div>
        ))}
      </div>

      {/* Full list */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(15,17,23,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="p-2">
          {ranked.map(entry => (
            <LeaderboardRow
              key={entry.name}
              rank={entry.rank}
              name={entry.name}
              cohort={entry.cohort}
              xp={entry.xp}
              isUser={entry.isUser}
              t={t}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
