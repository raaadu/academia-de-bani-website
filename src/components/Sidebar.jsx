import { useLanguage } from '../hooks/useLanguage'

const NAV_IDS = ['lectii', 'exercitii', 'profil', 'clasament']

const ICONS = {
  lectii: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  exercitii: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  profil: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  clasament: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
}

const LABEL_KEYS = {
  lectii: 'nav.lessons',
  exercitii: 'nav.exercises',
  profil: 'nav.profile',
  clasament: 'nav.leaderboard',
}

export default function Sidebar({ activeTab, setActiveTab, expanded, setExpanded, appState }) {
  const { xp, getLevel } = appState
  const { t } = useLanguage()
  const level = getLevel()
  const levelName = t(`levelNames.${level.name}`)
  const levelNextName = level.next ? t(`levelNames.${level.next}`) : null

  return (
    <aside
      className="sidebar-transition flex flex-col h-full bg-[#0F1117] border-r border-white/[0.06] relative z-20"
      style={{ width: expanded ? '220px' : '64px' }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06] overflow-hidden">
        <div className="flex-shrink-0 w-8 h-8">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="rgba(108,99,255,0.15)" stroke="#6C63FF" strokeWidth="1.5"/>
            <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#6C63FF" fontWeight="bold">₿</text>
          </svg>
        </div>
        {expanded && (
          <div className="whitespace-nowrap overflow-hidden fade-in-up">
            <span className="font-dm text-[13px] text-[#7B7D8E] leading-none">Academia de</span>
            <div className="font-syne font-extrabold text-[17px] text-[#6C63FF] leading-tight">Bani</div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {NAV_IDS.map((id) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-left overflow-hidden relative
                ${isActive ? 'bg-[#6C63FF]/15 text-[#6C63FF]' : 'text-[#7B7D8E] hover:bg-white/[0.04] hover:text-[#F0F0F5]'}
              `}
            >
              <span className="flex-shrink-0">{ICONS[id]}</span>
              {expanded && (
                <span className="font-dm text-[13px] font-medium whitespace-nowrap fade-in-up">
                  {t(LABEL_KEYS[id])}
                </span>
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#6C63FF] rounded-r" />
              )}
            </button>
          )
        })}
      </nav>

      {/* XP bar at bottom */}
      <div className="px-3 py-4 border-t border-white/[0.06] overflow-hidden">
        {expanded ? (
          <div className="fade-in-up">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-dm text-[#7B7D8E]">{levelName}</span>
              <span className="text-[11px] font-dm text-[#6C63FF] font-medium">{xp} XP</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full progress-bar-gradient rounded-full transition-all duration-700"
                style={{ width: level.needed ? `${Math.min((xp / level.needed) * 100, 100)}%` : '100%' }}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-[#6C63FF]/15 border border-[#6C63FF]/30 flex items-center justify-center">
              <span className="text-[9px] font-syne font-bold text-[#6C63FF]">
                {levelName.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
