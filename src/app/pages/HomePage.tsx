import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'
import { ContentRow } from '../components/ContentRow'
import { catalog, paraVos, sigueViendo, top10 } from '../data/content'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar active="Inicio" />
      <HeroBanner />
      <div className="py-6">
        {/* Para vos — social highlight row */}
        {paraVos.length > 0 && (
          <ContentRow label="Para vos" items={paraVos} variant="para-vos" highlight />
        )}
        {/* Sigue viendo */}
        {sigueViendo.length > 0 && (
          <ContentRow label="Sigue viendo" items={sigueViendo} variant="landscape" />
        )}
        {/* Top 10 */}
        <ContentRow label="Top 10 Películas" items={top10.slice(0, 10)} variant="top10" />
        {/* Ad banner */}
        <div className="px-6 mb-8">
          <div className="relative rounded-card overflow-hidden" style={{ background: 'linear-gradient(135deg, #0038A8 0%, #0050D4 100%)' }}>
            <div className="p-5 flex items-center gap-4">
              <div>
                <p className="text-[9px] font-black text-white/60 uppercase tracking-[1px] mb-1">PUBLICIDAD</p>
                <p className="text-[20px] font-black text-white tracking-tight">Paramount+</p>
                <p className="text-[12px] text-white/70 mt-1">Activa tu suscripción con tu cuenta ML</p>
              </div>
              <div className="ml-auto shrink-0 bg-white rounded-xl px-4 py-2">
                <span className="text-[14px] font-black text-[#0038A8]">P+</span>
              </div>
            </div>
          </div>
        </div>
        {/* Recomendados por tu red */}
        <ContentRow label="Recomendados por tu red" items={catalog.filter(c => c.networkRating && c.networkRating >= 4)} variant="standard" />
        {/* Infantil */}
        <ContentRow label="Infantil" items={catalog.filter(c => c.rating === 'ATP' || c.rating === 'TE').slice(0, 8)} variant="standard" />
      </div>
    </div>
  )
}
