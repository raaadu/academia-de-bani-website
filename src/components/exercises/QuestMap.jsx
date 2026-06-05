import { CATEGORY_META } from '../../data/exercises'

function QuestNode({ exercise, answered, dimmed, onTap }) {
  const meta = CATEGORY_META[exercise.category] || { emoji: '📚', gradient: '' }
  const isCompleted = !!answered
  const isCorrect = answered?.correct

  return (
    <button
      onClick={onTap}
      className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
        dimmed ? 'opacity-30' : ''
      } ${isCompleted ? '' : 'node-pulse'}`}
      style={{
        width: 56,
        height: 56,
        background: isCompleted
          ? (isCorrect ? 'rgba(0,212,170,0.2)' : 'rgba(255,77,106,0.15)')
          : 'rgba(108,99,255,0.12)',
        border: isCompleted
          ? `2px solid ${isCorrect ? '#00D4AA' : '#FF4D6A'}`
          : '2px solid rgba(108,99,255,0.6)',
        boxShadow: isCompleted
          ? `0 0 16px ${isCorrect ? 'rgba(0,212,170,0.3)' : 'rgba(255,77,106,0.2)'}`
          : '0 0 12px rgba(108,99,255,0.25)',
      }}
      aria-label={`Exercise ${exercise.id}`}
    >
      {isCompleted ? (
        <span className="text-[18px]">{isCorrect ? '✓' : '✗'}</span>
      ) : (
        <span className="text-[22px]">{meta.emoji || exercise.sceneIcon}</span>
      )}

      {/* XP badge on completed */}
      {isCompleted && isCorrect && (
        <span
          className="absolute -top-1.5 -right-1.5 font-body font-semibold text-[9px] px-1.5 py-0.5 rounded-full"
          style={{ background: '#00D4AA', color: '#08090E' }}
        >
          +{exercise.xp}
        </span>
      )}
    </button>
  )
}

export default function QuestMap({ exercises, answered, activeCategory, onSelect }) {
  return (
    <div className="flex flex-col items-center py-2">
      {exercises.map((ex, i) => {
        const dimmed = activeCategory !== 'toate' && ex.category !== activeCategory
        return (
          <div key={ex.id} className="flex flex-col items-center">
            <QuestNode
              exercise={ex}
              answered={answered[ex.id]}
              dimmed={dimmed}
              onTap={() => onSelect(ex)}
            />
            {i < exercises.length - 1 && (
              <div
                style={{
                  width: 2,
                  height: 24,
                  borderLeft: '2px dashed rgba(108,99,255,0.25)',
                  opacity: dimmed ? 0.3 : 1,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
