import { useState, useEffect } from 'react'
import { useAppState } from './hooks/useLocalStorage'
import { LanguageProvider } from './hooks/useLanguage'
import { supabase } from './lib/supabase'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import LessonsTab from './components/LessonsTab'
import ExercisesTab from './components/ExercisesTab'
import ProfileTab from './components/ProfileTab'
import Leaderboard from './components/Leaderboard'
import OnboardingModal from './components/OnboardingModal'
import SplashScreen from './components/SplashScreen'

function AppShell() {
  const [activeTab, setActiveTab] = useState('lectii')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const appState = useAppState()

  // Show splash on initial load, then hide after 1.5s
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1500)
    return () => clearTimeout(t)
  }, [])

  const handleSignOut = async () => {
    setShowSplash(true)
    if (supabase) {
      await supabase.auth.signOut()
    }
    appState.resetAll()
    setTimeout(() => setShowSplash(false), 1500)
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'lectii':    return <LessonsTab appState={appState} />
      case 'exercitii': return <ExercisesTab appState={appState} />
      case 'profil':    return <ProfileTab appState={appState} onSignOut={handleSignOut} />
      case 'clasament': return <Leaderboard appState={appState} />
      default:          return <LessonsTab appState={appState} />
    }
  }

  if (showSplash) return <SplashScreen />

  return (
    <div className="flex h-full bg-[#08090E] text-[#F0F0F5] overflow-hidden">
      {!appState.user && <OnboardingModal appState={appState} />}

      {/* Sidebar — desktop only */}
      <div className="hidden md:flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          appState={appState}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {renderTab()}
        </div>
      </main>

      {/* Bottom nav — fixed to bottom on mobile */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}
