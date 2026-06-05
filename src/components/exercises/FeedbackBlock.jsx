// Shared feedback components used by all question formats

export function FeedbackBlock({ isCorrect, explanation, language }) {
  const icon = isCorrect ? '💡' : '📖'
  const label = isCorrect
    ? (language === 'ro' ? 'De ce?' : 'Why?')
    : (language === 'ro' ? 'Iată de ce:' : "Here's why:")

  return (
    <div
      className="mt-4 rounded-xl fade-in-up"
      style={{
        background: isCorrect ? 'rgba(0,212,170,0.08)' : 'rgba(255,77,106,0.08)',
        borderLeft: `3px solid ${isCorrect ? '#00D4AA' : '#FF4D6A'}`,
        padding: '12px 16px',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[15px]">{icon}</span>
        <span
          className="font-body font-semibold text-[13px]"
          style={{ color: isCorrect ? '#00D4AA' : '#FF4D6A' }}
        >
          {label}
        </span>
      </div>
      <p className="font-body font-normal text-[14px] text-[#C8C8D4] leading-relaxed">
        {explanation}
      </p>
    </div>
  )
}

export function XpFloat({ xp }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
      <span className="xp-float font-display font-bold text-[24px] text-[#00D4AA]">
        ⚡ +{xp} XP
      </span>
    </div>
  )
}

export function AnswerOptions({ options, selected, submitted, correct, onSelect, shaking }) {
  const letters = ['A', 'B', 'C', 'D']
  return (
    <div className={`flex flex-col gap-2 ${shaking ? 'shake' : ''}`}>
      {options.map((opt, i) => {
        let bg = 'rgba(255,255,255,0.03)'
        let border = '1px solid rgba(255,255,255,0.08)'
        let color = '#C8C8D4'
        let letterBg = 'rgba(108,99,255,0.15)'
        let letterColor = '#a89cff'

        if (submitted) {
          if (i === correct) {
            bg = 'rgba(0,212,170,0.1)'; border = '1px solid rgba(0,212,170,0.35)'; color = '#00D4AA'
            letterBg = 'rgba(0,212,170,0.2)'; letterColor = '#00D4AA'
          } else if (i === selected && i !== correct) {
            bg = 'rgba(255,77,106,0.1)'; border = '1px solid rgba(255,77,106,0.35)'; color = '#FF4D6A'
            letterBg = 'rgba(255,77,106,0.2)'; letterColor = '#FF4D6A'
          } else {
            bg = 'rgba(255,255,255,0.02)'; color = '#4A4B5A'
          }
        } else if (selected === i) {
          bg = 'rgba(108,99,255,0.12)'; border = '1px solid rgba(108,99,255,0.4)'; color = '#a89cff'
        }

        return (
          <button
            key={i}
            disabled={submitted}
            onClick={() => onSelect(i)}
            className="w-full text-left px-4 py-3 rounded-xl font-body text-[14px] transition-all duration-200 min-h-[52px] flex items-center gap-3"
            style={{ background: bg, border, color }}
          >
            <span
              className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center font-body font-semibold text-[11px]"
              style={{ background: letterBg, color: letterColor }}
            >
              {letters[i]}
            </span>
            <span className="flex-1 text-[14px] leading-snug">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

export function DoneButton({ onClose, language }) {
  return (
    <button
      onClick={onClose}
      className="mt-4 w-full py-3 rounded-xl font-body font-semibold text-[14px] text-white min-h-[48px] transition-all duration-200"
      style={{ background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.3)' }}
    >
      {language === 'ro' ? 'Gata' : 'Done'} →
    </button>
  )
}
