import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding'), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center gap-6">
      <div className="animate-fade-in flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="w-20 h-20 bg-[#FFE600] rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/20">
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <polygon points="12,8 32,20 12,32" fill="#0A0A0A" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-[28px] font-black text-white tracking-tight">Mercado Play</h1>
          <p className="text-[13px] text-[#888] mt-1">Streaming gratuito para ti</p>
        </div>
      </div>
      {/* Loading dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#FFE600]"
            style={{ animation: `pulseDot 1.2s ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
      <style>{`@keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </div>
  )
}
