import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { HERO_CONTENTS } from '../data/content';

export function HeroBanner() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const content = HERO_CONTENTS[current];

  const goTo = (idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % HERO_CONTENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full h-[520px] overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${content.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className={`absolute left-11 bottom-16 max-w-xl transition-all duration-500 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {content.isNew && (
          <span className="inline-block bg-[#FFE600] text-black text-xs font-bold px-2 py-0.5 rounded mb-3">
            NUEVO
          </span>
        )}
        <h1 className="text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: 1.1 }}>
          {content.title}
        </h1>
        <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
          <span className="border border-white/40 px-1.5 py-0.5 rounded text-xs">{content.classification}</span>
          <span>{content.genre}</span>
          <span>·</span>
          <span>{content.duration}</span>
          <span>·</span>
          <span>{content.year}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-4">
          {[1,2,3,4,5].map((star) => (
            <Star
              key={star}
              size={16}
              className={star <= Math.round(content.rating) ? 'text-[#FFE600] fill-[#FFE600]' : 'text-white/30'}
            />
          ))}
          <span className="text-white/70 text-sm ml-1">({content.rating})</span>
        </div>
        <p className="text-white/80 text-sm mb-6 leading-relaxed max-w-md">{content.description}</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/reproducir/${content.id}`)}
            className="flex items-center gap-2 bg-[#FFE600] text-black px-6 py-3 rounded-md font-bold text-sm hover:bg-yellow-300 transition-colors"
          >
            <Play size={16} fill="black" />
            Ver contenido
          </button>
          <button
            onClick={() => navigate(`/contenido/${content.id}`)}
            className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-md font-semibold text-sm border border-white/30 hover:bg-white/20 transition-colors"
          >
            <Info size={16} />
            Más información
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => goTo((current - 1 + HERO_CONTENTS.length) % HERO_CONTENTS.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/20"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo((current + 1) % HERO_CONTENTS.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/20"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {HERO_CONTENTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current ? 'bg-[#FFE600] w-6 h-2' : 'bg-white/40 w-2 h-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}