import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useAuth } from '../hooks/useAuth'

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/>
    </svg>
  )

export default function OnboardingModal() {
  const { language, setLanguage, t } = useLanguage()
  const { signUp, signIn } = useAuth()
  const [mode, setMode] = useState('signup') // 'signup' | 'signin'

  // Signup fields
  const [name, setCohortName] = useState('')
  const [cohort, setCohort] = useState('')
  // Shared auth fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // State
  const [loading, setLoading] = useState(false)
  const [nameError, setNameError] = useState('')
  const [authError, setAuthError] = useState('')

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  }
  const onFocus = (e) => {
    e.target.style.border = '1px solid rgba(108,99,255,0.5)'
    e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.1)'
  }
  const onBlur = (e) => {
    e.target.style.border = '1px solid rgba(255,255,255,0.08)'
    e.target.style.boxShadow = 'none'
  }

  const resolveAuthError = (err) => {
    const msg = err?.message?.toLowerCase() || ''
    if (msg.includes('already registered') || msg.includes('user already exists')) {
      return t('onboarding.errorEmailExists')
    }
    if (msg.includes('invalid login') || msg.includes('invalid credentials') || msg.includes('email not confirmed')) {
      return t('onboarding.errorInvalidCredentials')
    }
    if (msg.includes('password')) {
      return t('onboarding.errorPasswordShort')
    }
    return t('onboarding.errorGeneric')
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setAuthError('')
    if (!name.trim()) {
      setNameError(t('onboarding.error'))
      return
    }
    if (password.length < 6) {
      setAuthError(t('onboarding.errorPasswordShort'))
      return
    }

    setLoading(true)
    try {
      const { error } = await signUp(
        email,
        password,
        name.trim(),
        cohort.trim() || t('onboarding.independent'),
        language,
      )
      if (error) {
        console.error('Full signup error:', error)
        setAuthError(resolveAuthError(error))
      }
      // On success, onAuthStateChange fires → AuthGate re-renders → AppShell mounts
    } catch (err) {
      setAuthError(t('onboarding.errorGeneric'))
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setAuthError('')
    setLoading(true)
    try {
      const { error } = await signIn(email, password)
      if (error) {
        console.error('Full signin error:', error)
        setAuthError(resolveAuthError(error))
        return
      }
      // On success, onAuthStateChange fires → AuthGate re-renders → AppShell mounts
    } catch (err) {
      setAuthError(t('onboarding.errorGeneric'))
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (next) => {
    setMode(next)
    setAuthError('')
    setNameError('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8,9,14,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      />

      {/* Sheet / card */}
      <div
        className="relative w-full md:max-w-md fade-in-up slide-up-sheet"
        style={{
          background: 'rgba(22,24,32,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: '24px 24px 0 0',
          padding: '32px 24px 32px',
          boxShadow: '0 -16px 64px rgba(0,0,0,0.5), 0 0 60px rgba(108,99,255,0.08)',
        }}
        ref={(el) => {
          if (el && window.matchMedia('(min-width: 768px)').matches) {
            el.style.borderRadius = '20px'
          }
        }}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-[#7B7D8E]" />
        </div>

        {/* Language toggle */}
        <div className="flex gap-2 mb-6">
          {[
            { code: 'ro', flag: '🇷🇴', label: 'Română' },
            { code: 'en', flag: '🇬🇧', label: 'English' },
          ].map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-dm text-[13px] font-medium transition-all duration-200"
              style={{
                background: language === code ? '#6C63FF' : 'rgba(255,255,255,0.04)',
                border: language === code ? '1px solid #6C63FF' : '1px solid rgba(255,255,255,0.08)',
                color: language === code ? 'white' : '#7B7D8E',
                boxShadow: language === code ? '0 0 16px rgba(108,99,255,0.3)' : 'none',
              }}
            >
              <span>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Logo icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.25)',
              boxShadow: '0 0 32px rgba(108,99,255,0.2)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" fill="rgba(108,99,255,0.2)" stroke="#6C63FF" strokeWidth="1.5"/>
              <text x="16" y="21" textAnchor="middle" fontSize="16" fill="#6C63FF" fontWeight="bold" fontFamily="serif">₿</text>
            </svg>
          </div>
        </div>

        <h1 className="font-syne font-extrabold text-[26px] text-center text-[#F0F0F5] leading-tight mb-2">
          {mode === 'signup'
            ? <>{t('onboarding.welcome').replace('Academia de Bani', '')}<br /><span style={{ color: '#6C63FF' }}>Academia de Bani</span></>
            : <span style={{ color: '#6C63FF' }}>Academia de Bani</span>
          }
        </h1>
        <p className="font-dm text-[13px] text-[#7B7D8E] text-center mb-6 leading-relaxed">
          {t('onboarding.subtitle')}
        </p>

        {/* ── SIGN UP FORM ── */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-dm font-medium text-[#7B7D8E] mb-2 uppercase tracking-wider">
                {t('onboarding.nameLabel')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setCohortName(e.target.value); setNameError('') }}
                placeholder={t('onboarding.namePlaceholder')}
                className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-[#F0F0F5] placeholder-[#4A4B5A] outline-none transition-all duration-200 min-h-[48px]"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
                autoFocus
              />
              {nameError && <p className="text-[#FF4D6A] text-[12px] font-dm mt-1">{nameError}</p>}
            </div>

            {/* Cohort */}
            <div>
              <label className="block text-[11px] font-dm font-medium text-[#7B7D8E] mb-2 uppercase tracking-wider">
                {t('onboarding.cohortLabel')}
              </label>
              <input
                type="text"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                placeholder={t('onboarding.cohortPlaceholder')}
                className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-[#F0F0F5] placeholder-[#4A4B5A] outline-none transition-all duration-200 min-h-[48px]"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-dm font-medium text-[#7B7D8E] mb-2 uppercase tracking-wider">
                {t('onboarding.emailLabel')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setAuthError('') }}
                placeholder={t('onboarding.emailPlaceholder')}
                className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-[#F0F0F5] placeholder-[#4A4B5A] outline-none transition-all duration-200 min-h-[48px]"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-dm font-medium text-[#7B7D8E] mb-2 uppercase tracking-wider">
                {t('onboarding.passwordLabel')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setAuthError('') }}
                  placeholder={t('onboarding.passwordPlaceholder')}
                  className="w-full px-4 py-3 pr-12 rounded-xl font-dm text-[14px] text-[#F0F0F5] placeholder-[#4A4B5A] outline-none transition-all duration-200 min-h-[48px]"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7D8E] hover:text-[#F0F0F5] transition-colors p-1"
                  tabIndex={-1}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-[#FF4D6A] text-[13px] font-dm -mt-1 leading-snug">{authError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-accent mt-1 w-full py-3.5 rounded-xl font-syne font-bold text-[15px] text-white tracking-wide min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? <><span className="btn-spinner" /></> : t('onboarding.cta')}
            </button>

            <button
              type="button"
              onClick={() => switchMode('signin')}
              className="text-center text-[13px] font-dm text-[#7B7D8E] hover:text-[#a89cff] transition-colors py-1"
            >
              {t('onboarding.switchToSignIn')}
            </button>
          </form>
        )}

        {/* ── SIGN IN FORM ── */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-dm font-medium text-[#7B7D8E] mb-2 uppercase tracking-wider">
                {t('onboarding.emailLabel')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setAuthError('') }}
                placeholder={t('onboarding.emailPlaceholder')}
                className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-[#F0F0F5] placeholder-[#4A4B5A] outline-none transition-all duration-200 min-h-[48px]"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
                autoFocus
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-dm font-medium text-[#7B7D8E] mb-2 uppercase tracking-wider">
                {t('onboarding.passwordLabel')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setAuthError('') }}
                  placeholder={t('onboarding.passwordPlaceholder')}
                  className="w-full px-4 py-3 pr-12 rounded-xl font-dm text-[14px] text-[#F0F0F5] placeholder-[#4A4B5A] outline-none transition-all duration-200 min-h-[48px]"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7D8E] hover:text-[#F0F0F5] transition-colors p-1"
                  tabIndex={-1}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-[#FF4D6A] text-[13px] font-dm -mt-1 leading-snug">{authError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-accent mt-1 w-full py-3.5 rounded-xl font-syne font-bold text-[15px] text-white tracking-wide min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? <><span className="btn-spinner" /></> : t('onboarding.ctaSignIn')}
            </button>

            <button
              type="button"
              onClick={() => switchMode('signup')}
              className="text-center text-[13px] font-dm text-[#7B7D8E] hover:text-[#a89cff] transition-colors py-1"
            >
              {t('onboarding.switchToSignUp')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
