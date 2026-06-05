import { useLanguage } from '../hooks/useLanguage'

const NAV_IDS = ['lectii', 'exercitii', 'profil', 'clasament']

const ICONS = {
  lectii: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  exercitii: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  profil: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  clasament: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useLanguage()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex bg-[#0F1117] border-t border-white/[0.06]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {NAV_IDS.map((id) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex-1 flex flex-col items-center gap-1 py-3 min-h-[56px] transition-all duration-200"
            style={{ color: isActive ? '#6C63FF' : '#7B7D8E' }}
          >
            {ICONS[id]}
            <span className="text-[10px] font-dm font-medium">{t(LABEL_KEYS[id])}</span>
          </button>
        )
      })}
    </nav>
  )
}
