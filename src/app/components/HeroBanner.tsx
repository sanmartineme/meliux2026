import { useNavigate } from 'react-router-dom'
import { Play, Info } from 'lucide-react'
import { useState } from 'react'
import { catalog } from '../data/content'

const HERO_ITEMS = [catalog[0], catalog[1], catalog[4]]

export default function HeroBanner() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const item = HERO_ITEMS[active]

  return (
    <div className={`relative h-[480px] overflow-hidden bg-gradient-to-br ${item.gradient}`}>
      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0A0A0A 0%, transparent 30%)' }} />

      {/* Big emoji on right */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 text-[200px] opacity-20 select-none">{item.emoji}</div>

      {/* Content */}
      <div className="absolute bottom-12 left-16 max-w-[500px] z-10 animate-fade-in">
        <div className="flex gap-2 mb-3">
          <span className="bg-[#1C1C1C] border border-[#3A3A3A] text-[10px] font-semibold text-[#CCC] px-1.5 py-0.5 rounded-[2px]">{item.rating}</span>
        </div>
        <h1 className="text-[36px] font-black text-white leading-tight mb-2" style={{ letterSpacing: '-1px' }}>{item.title}</h1>
        <p className="text-[12px] text-[#B0B0B0] mb-2">{item.genre} · {item.duration} · {item.year}</p>
        <p className="text-[13px] text-[#CCC] mb-5 leading-relaxed line-clamp-2">{item.synopsis}</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/player/${item.id}`)}
            className="flex items-center gap-2 bg-[#FFE600] text-black font-black text-[13px] px-5 py-2.5 rounded-[4px] hover:bg-[#FFF066] transition-colors"
          >
            <Play size={14} fill="black" /> Ver gratis
          </button>
          <button
            onClick={() => navigate(`/content/${item.id}`)}
            className="flex items-center gap-2 bg-transparent text-white border border-[#555] text-[13px] px-5 py-2.5 rounded-[4px] hover:border-[#AAA] transition-colors"
          >
            <Info size={14} /> Más información
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {HERO_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-[#FFE600]' : 'bg-[#555]'}`}
          />
        ))}
      </div>
    </div>
  )
}
