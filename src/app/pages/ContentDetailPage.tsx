import { useParams, useNavigate } from 'react-router-dom'
import { Play, Share2, Plus, Star, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { ContentRow } from '../components/ContentRow'
import { catalog } from '../data/content'
import { useApp } from '../context'

export default function ContentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { starredRatings, setRating } = useApp()
  const item = catalog.find(c => c.id === id)
  const [hoverStar, setHoverStar] = useState(0)

  if (!item) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="text-[#555]">Contenido no encontrado</p></div>

  const userRating = starredRatings[id!] ?? 0
  const netRating = item.networkRating

  const related = catalog.filter(c => c.id !== id && c.genre === item.genre).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      {/* Hero */}
      <div className={`relative h-[420px] bg-gradient-to-br ${item.gradient} overflow-hidden`}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0A0A0A 0%, transparent 35%)' }} />
        <div className="absolute right-24 top-1/2 -translate-y-1/2 text-[180px] opacity-20 select-none">{item.emoji}</div>

        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 z-10 flex items-center gap-2 text-[12px] text-[#888] hover:text-white transition-colors">
          <ArrowLeft size={16} /> Volver
        </button>

        <div className="absolute bottom-8 left-10 max-w-[520px] z-10">
          <div className="flex gap-2 mb-3">
            <span className="bg-[#1C1C1C] border border-[#3A3A3A] text-[10px] font-semibold text-[#CCC] px-1.5 py-0.5 rounded-[2px]">{item.rating}</span>
            {item.isNew && <span className="bg-[#FFE600] text-black text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">NUEVO</span>}
            {netRating && netRating >= 4 && (item.networkRatingCount ?? 0) >= 2 &&
              <span className="bg-[rgba(255,230,0,0.15)] border border-[rgba(255,230,0,0.3)] text-[#FFE600] text-[8px] font-black uppercase px-1.5 py-0.5 rounded-[2px]">★ RECOMENDADO</span>
            }
          </div>
          <h1 className="text-[34px] font-black text-white mb-2" style={{ letterSpacing: '-0.8px' }}>{item.title}</h1>
          <p className="text-[12px] text-[#888] mb-2">{item.genre} · {item.duration} · {item.year}</p>
          {netRating && <p className="text-[12px] text-[#888] mb-3">★ {netRating.toFixed(1)} según tu red ({item.networkRatingCount} calificaciones)</p>}
          <p className="text-[13px] text-[#CCC] mb-5 leading-relaxed max-w-md">{item.synopsis}</p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate(`/player/${id}`)} className="flex items-center gap-2 bg-[#FFE600] text-black font-black text-[13px] px-5 py-2.5 rounded-[4px] hover:bg-[#FFF066] transition-colors">
              <Play size={14} fill="black" /> Ver gratis
            </button>
            <button onClick={() => navigate(`/recommend/${id}`)} className="flex items-center gap-2 bg-transparent text-white border border-[#555] text-[13px] px-5 py-2.5 rounded-[4px] hover:border-[#AAA] transition-colors">
              <Share2 size={14} /> Recomendar
            </button>
            <button className="flex items-center gap-2 bg-transparent text-white border border-[#555] text-[13px] px-4 py-2.5 rounded-[4px] hover:border-[#AAA] transition-colors">
              <Plus size={14} /> Mi lista
            </button>
          </div>
        </div>
      </div>

      {/* Rating section */}
      <div className="px-10 py-6 border-b border-[#1C1C1C]">
        <p className="text-[13px] font-black text-white mb-3">Tu calificación</p>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              onMouseEnter={() => setHoverStar(n)}
              onMouseLeave={() => setHoverStar(0)}
              onClick={() => setRating(id!, n)}
              className="text-[28px] transition-transform hover:scale-110"
              style={{ color: n <= (hoverStar || userRating) ? '#FFE600' : '#2E2E2E' }}
            >★</button>
          ))}
          {userRating > 0 && <span className="text-[12px] text-[#888] self-center ml-2">Tu calificación: {userRating}/5</span>}
        </div>
      </div>

      {/* Recommendation from network */}
      {item.recommendation && (
        <div className="px-10 py-5 border-b border-[#1C1C1C]">
          <p className="text-[11px] font-black text-[#555] uppercase tracking-wider mb-3">Recomendado por</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-black text-[14px] border-2 border-[#FFE600]"
              style={{ background: item.recommendation.color }}>
              {item.recommendation.avatar}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">{item.recommendation.from}</p>
              {item.recommendation.message && <p className="text-[12px] text-[#888] italic">"{item.recommendation.message}"</p>}
            </div>
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="py-6">
          <ContentRow label="Títulos similares" items={related} variant="standard" />
        </div>
      )}
    </div>
  )
}
