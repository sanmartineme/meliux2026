import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, Pause, Volume2, Maximize, Share2 } from 'lucide-react'
import { catalog } from '../data/content'
import { useApp } from '../context'

export default function VideoPlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setRating, starredRatings } = useApp()
  const item = catalog.find(c => c.id === id)

  const [playing, setPlaying]       = useState(true)
  const [progress, setProgress]     = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [postFlow, setPostFlow]     = useState(false)
  const [hoverStar, setHoverStar]   = useState(0)
  const [review, setReview]         = useState('')
  const [done, setDone]             = useState(false)
  const userRating = starredRatings[id!] ?? 0

  // Simulate playback
  useEffect(() => {
    if (!playing || postFlow) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setPostFlow(true); return 100 }
        return p + 0.5
      })
    }, 150)
    return () => clearInterval(interval)
  }, [playing, postFlow])

  // Auto hide controls
  useEffect(() => {
    if (!showControls) return
    const t = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(t)
  }, [showControls])

  if (!item) return null

  if (done) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-[20px] font-black text-white mb-2">¡Gracias por tu reseña!</h2>
          <p className="text-[13px] text-[#555] mb-6">Tu grupo podrá verla</p>
          <button onClick={() => navigate('/home')} className="bg-[#FFE600] text-black font-black text-[14px] py-3 px-8 rounded-[4px]">
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  if (postFlow) {
    return (
      <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center animate-fade-in flex flex-col items-center gap-5">
          <div className="text-5xl">{item.emoji}</div>
          <div>
            <p className="text-[12px] text-[#555] mb-1">Terminaste de ver</p>
            <h2 className="text-[22px] font-black text-white">{item.title}</h2>
          </div>
          <div>
            <p className="text-[13px] text-[#888] mb-3">¿Qué te pareció?</p>
            <div className="flex gap-2 justify-center">
              {[1,2,3,4,5].map(n => (
                <button key={n} onMouseEnter={() => setHoverStar(n)} onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setRating(id!, n)}
                  className="text-[32px] transition-transform hover:scale-110"
                  style={{ color: n <= (hoverStar || userRating) ? '#FFE600' : '#2E2E2E' }}>★</button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              maxLength={280}
              placeholder="Escribe una reseña para tu grupo (opcional)..."
              className="w-full bg-[#1C1C1C] border border-[#2E2E2E] rounded-[4px] p-3 text-[12px] text-white placeholder:text-[#555] outline-none focus:border-[#FFE600] resize-none h-16 leading-relaxed"
            />
            <p className="text-[10px] text-right text-[#555] mt-1">{review.length} / 280</p>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={() => navigate('/home')} className="flex-1 py-2.5 bg-transparent border border-[#2E2E2E] text-white text-[12px] rounded-[4px] hover:border-[#3A3A3A]">
              Omitir
            </button>
            <button onClick={() => navigate(`/recommend/${id}`)} className="flex-[2] py-2.5 bg-transparent border border-[#2E2E2E] text-[#888] text-[12px] rounded-[4px] flex items-center justify-center gap-1 hover:border-[#3A3A3A]">
              <Share2 size={12} /> Recomendar
            </button>
          </div>
          <button onClick={() => setDone(true)} className="w-full py-3 bg-[#FFE600] text-black font-black text-[13px] rounded-[4px] hover:bg-[#FFF066]">
            Compartir con mi grupo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black cursor-none"
      onClick={() => { setShowControls(true); setPlaying(p => !p) }}
      onMouseMove={() => setShowControls(true)}
    >
      {/* Simulated video */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
        <span className="text-[160px] opacity-10 select-none">{item.emoji}</span>
      </div>

      {/* Controls overlay */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)' }}>
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60">
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="text-[14px] font-black text-white">{item.title}</p>
            <p className="text-[11px] text-[#888]">{item.genre} · {item.year}</p>
          </div>
        </div>

        {/* Center play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
            {playing ? <Pause size={24} className="text-white" /> : <Play size={24} fill="white" className="text-white" />}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Progress */}
          <div className="h-1 bg-[#333] rounded-full mb-4 cursor-pointer">
            <div className="h-full bg-[#FFE600] rounded-full relative" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFE600] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={e => { e.stopPropagation(); setPlaying(p => !p) }} className="text-white">
              {playing ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </button>
            <Volume2 size={18} className="text-white" />
            <span className="text-[12px] text-[#888]">
              {Math.floor(progress * parseInt(item.duration) / 100)} / {item.duration}
            </span>
            <div className="flex-1" />
            <button onClick={e => { e.stopPropagation(); navigate(`/recommend/${id}`) }} className="text-white opacity-70 hover:opacity-100 flex items-center gap-1 text-[12px]">
              <Share2 size={14} /> Recomendar
            </button>
            <Maximize size={18} className="text-white opacity-70" />
          </div>
        </div>
      </div>
    </div>
  )
}
