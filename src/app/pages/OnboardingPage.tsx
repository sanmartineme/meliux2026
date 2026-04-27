import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Play, Users, Star, MessageCircle } from 'lucide-react'

const STEPS = [
  {
    icon: <Play size={32} className="text-black" />,
    title: 'Streaming gratuito',
    desc: 'Miles de películas y series sin costo. Solo necesitas tu cuenta de Mercado Libre.',
    accent: '#FFE600',
    emoji: '🎬',
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: 'Tu red de confianza',
    desc: 'Crea grupos con familia y amigos. Las recomendaciones de tu gente valen más.',
    accent: '#1565C0',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    icon: <Star size={32} className="text-white" />,
    title: 'Calificaciones reales',
    desc: 'Ve qué calificaron tus contactos. La etiqueta ★ Recomendado viene de tu red, no de desconocidos.',
    accent: '#2E7D32',
    emoji: '⭐',
  },
  {
    icon: <MessageCircle size={32} className="text-black" />,
    title: '¡Empieza a recomendar!',
    desc: 'Al terminar una película o serie, comparte tu opinión y recomienda directamente a quien quieras.',
    accent: '#FFE600',
    emoji: '📤',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* ML bar */}
      <div className="h-7 bg-[#FFE600] flex items-center justify-center shrink-0">
        <span className="text-[10px] font-black text-black tracking-wide">MERCADO LIBRE</span>
      </div>

      {/* Skip */}
      <div className="flex justify-end px-6 pt-4 shrink-0">
        <button
          onClick={() => navigate('/login')}
          className="text-[12px] text-[#555] hover:text-[#888] transition-colors"
        >
          Saltar
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8 animate-fade-in">
        {/* Icon circle */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-2xl"
          style={{ background: current.accent, boxShadow: `0 0 60px ${current.accent}40` }}
        >
          {current.emoji}
        </div>

        {/* Text */}
        <div className="max-w-sm">
          <h2 className="text-[28px] font-black text-white mb-3" style={{ letterSpacing: '-0.5px' }}>
            {current.title}
          </h2>
          <p className="text-[14px] text-[#888] leading-relaxed">{current.desc}</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`rounded-full transition-all ${
                i === step ? 'w-6 h-2 bg-[#FFE600]' : 'w-2 h-2 bg-[#2E2E2E]'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => isLast ? navigate('/login') : setStep(s => s + 1)}
            className="flex items-center justify-center gap-2 bg-[#FFE600] text-black font-black text-[14px] py-3.5 rounded-[4px] hover:bg-[#FFF066] transition-colors w-full"
          >
            {isLast ? 'Comenzar' : 'Siguiente'}
            <ChevronRight size={16} />
          </button>
          {!isLast && (
            <button
              onClick={() => navigate('/login')}
              className="text-[12px] text-[#555] hover:text-[#888] transition-colors py-2"
            >
              Ya tengo cuenta
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
