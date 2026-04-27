import { useNavigate } from 'react-router-dom'
import type { Content } from '../data/content'
import { useApp } from '../context'

interface CardProps {
  content: Content
  variant?: 'standard' | 'landscape' | 'top10' | 'para-vos'
  rank?: number
}

export default function ContentCard({ content, variant = 'standard', rank }: CardProps) {
  const navigate = useNavigate()
  const { starredRatings } = useApp()
  const userRating = starredRatings[content.id]
  const netRating = userRating ?? content.networkRating

  const badgeEl = content.isNew
    ? <span className="absolute top-2 left-2 bg-[#FFE600] text-black text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">NUEVO</span>
    : content.isLastDays
    ? <span className="absolute top-2 left-2 bg-[#FF6B35] text-white text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">ÚLTIMOS DÍAS</span>
    : content.isFree
    ? <span className="absolute top-2 left-2 bg-[#2E7D32] text-white text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">GRATIS</span>
    : content.isExclusive
    ? <span className="absolute top-2 left-2 bg-[#1565C0] text-white text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">EXCLUSIVO</span>
    : null

  const recBadge = netRating && netRating >= 4.0 && (content.networkRatingCount ?? 0) >= 2
    ? <span className="absolute top-2 right-2 bg-[rgba(255,230,0,0.15)] border border-[rgba(255,230,0,0.3)] text-[#FFE600] text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">★ REC</span>
    : null

  if (variant === 'para-vos' && content.recommendation) {
    const rec = content.recommendation
    return (
      <div
        className="w-48 shrink-0 rounded-card overflow-hidden bg-[#1C1C1C] border border-[rgba(255,230,0,0.2)] hover:border-[#FFE600] transition-colors cursor-pointer"
        onClick={() => navigate(`/content/${content.id}`)}
      >
        {/* thumb */}
        <div className={`h-24 bg-gradient-to-br ${content.gradient} flex items-center justify-center text-4xl relative`}>
          <span>{content.emoji}</span>
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-black border-[1.5px] border-[#FFE600]"
              style={{ background: rec.color }}
            >
              {rec.avatar}
            </div>
            <span className="text-[9px] font-semibold text-white">{rec.from}</span>
          </div>
        </div>
        {/* info */}
        <div className="p-2.5">
          <p className="text-[11px] font-bold text-white mb-0.5 truncate">{content.title}</p>
          {rec.message && <p className="text-[10px] text-[#888] italic mb-2 truncate">"{rec.message}"</p>}
          <button
            className="w-full py-1.5 bg-[#FFE600] text-black text-[10px] font-black rounded-[3px] hover:bg-[#FFF066] transition-colors"
            onClick={e => { e.stopPropagation(); navigate(`/player/${content.id}`) }}
          >
            ▶ Ver ahora
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'landscape') {
    return (
      <div
        className="w-44 shrink-0 rounded-card overflow-hidden bg-[#1C1C1C] cursor-pointer hover:scale-[1.04] transition-transform"
        onClick={() => navigate(`/content/${content.id}`)}
      >
        <div className={`h-[100px] bg-gradient-to-br ${content.gradient} flex items-center justify-center text-3xl relative`}>
          <span>{content.emoji}</span>
          {/* progress bar */}
          {content.progress != null && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#333]">
              <div className="h-full bg-[#FFE600] rounded-[1px]" style={{ width: `${content.progress}%` }} />
            </div>
          )}
        </div>
        <div className="p-2 bg-[#1C1C1C]">
          <p className="text-[10px] font-semibold text-[#E0E0E0] truncate">{content.title}</p>
          <p className="text-[9px] text-[#666] mt-0.5">
            {content.progress != null ? `${Math.round((1 - content.progress / 100) * parseInt(content.duration))} min por ver` : content.duration}
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'top10') {
    return (
      <div className="relative w-[120px] shrink-0 cursor-pointer hover:scale-[1.03] transition-transform"
        onClick={() => navigate(`/content/${content.id}`)}>
        <div className="absolute left-[-8px] bottom-5 font-serif text-[60px] font-black text-[#2E2E2E] leading-none select-none" style={{ letterSpacing: '-4px' }}>
          {rank}
        </div>
        <div className="relative z-10 ml-7 rounded-card overflow-hidden bg-[#1C1C1C]">
          <div className={`h-[130px] bg-gradient-to-br ${content.gradient} flex items-center justify-center text-3xl relative`}>
            <span>{content.emoji}</span>
            {badgeEl}
          </div>
          <div className="p-1.5"><p className="text-[10px] font-semibold text-[#E0E0E0] truncate">{content.title}</p></div>
        </div>
      </div>
    )
  }

  // standard
  return (
    <div
      className="w-[120px] shrink-0 rounded-card overflow-hidden bg-[#1C1C1C] cursor-pointer hover:scale-105 transition-transform"
      onClick={() => navigate(`/content/${content.id}`)}
    >
      <div className={`h-[168px] bg-gradient-to-br ${content.gradient} flex items-center justify-center text-4xl relative`}>
        <span>{content.emoji}</span>
        {badgeEl}
        {recBadge}
      </div>
      <div className="p-1.5 bg-[#1C1C1C]">
        <p className="text-[10px] font-semibold text-[#E0E0E0] truncate">{content.title}</p>
        <p className="text-[9px] text-[#666] mt-0.5">
          {netRating ? `★ ${netRating.toFixed(1)} · ` : ''}{content.genre} · {content.year}
        </p>
      </div>
    </div>
  )
}
