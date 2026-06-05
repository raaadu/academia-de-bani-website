export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08090E]">
      <div className="flex items-baseline gap-1.5">
        <span className="font-body font-normal text-[18px] text-[#7B7D8E] tracking-wide">
          Academia
        </span>
        <span className="font-display font-extrabold text-[32px] text-[#6C63FF] leading-none">
          de Bani
        </span>
      </div>

      <div
        className="mt-6 relative overflow-hidden rounded-full"
        style={{ width: 120, height: 4, background: 'rgba(108,99,255,0.2)' }}
      >
        <div className="splash-shimmer absolute inset-0 rounded-full" />
      </div>
    </div>
  )
}
