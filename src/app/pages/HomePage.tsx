import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { ContentRow } from '../components/ContentRow';
import {
  CONTENTS,
  TOP_RECOMMENDED,
  NEW_SERIES,
  DESTACADOS,
  getContentByCategory,
} from '../data/content';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('cat');
  const search = searchParams.get('search');

  // Skeleton: show every time the home page mounts
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setShowSkeleton(true);
    setFadeOut(false);
    const fadeTimer = setTimeout(() => setFadeOut(true), 1400);
    const hideTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1700);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  const filteredContent = () => {
    if (search) {
      return CONTENTS.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.genre.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (cat === 'serie') return getContentByCategory('serie');
    if (cat === 'pelicula') return getContentByCategory('pelicula');
    if (cat === 'infantil') return getContentByCategory('infantil');
    return null;
  };

  const filtered = filteredContent();

  const getCategoryTitle = () => {
    if (search) return `Resultados para "${search}"`;
    if (cat === 'serie') return 'Series';
    if (cat === 'pelicula') return 'Películas';
    if (cat === 'infantil') return 'Contenido Infantil';
    if (cat === 'comunidad') return 'Comunidad';
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">

      {/* Skeleton overlay */}
      {showSkeleton && (
        <div
          className={`fixed inset-0 z-50 bg-[#0a0a14] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Fake navbar */}
          <div className="w-full h-[52px] bg-[#FFE600]/10 animate-pulse" />
          <div className="w-full h-[64px] bg-white/5 animate-pulse" />

          {/* Fake hero */}
          <div className="mx-0 mt-0 h-[420px] bg-white/5 animate-pulse relative overflow-hidden">
            <div className="absolute bottom-10 left-11 space-y-3">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-9 w-72 rounded bg-white/10" />
              <div className="h-3 w-96 rounded bg-white/10" />
              <div className="h-3 w-80 rounded bg-white/10" />
              <div className="flex gap-3 mt-4">
                <div className="h-10 w-32 rounded-lg bg-white/10" />
                <div className="h-10 w-32 rounded-lg bg-white/10" />
              </div>
            </div>
          </div>

          {/* Fake rows */}
          <div className="px-11 py-10 space-y-10">
            {[1, 2].map((row) => (
              <div key={row}>
                <div className="h-5 w-48 rounded bg-white/10 animate-pulse mb-4" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((card) => (
                    <div key={card} className="shrink-0 w-[220px] h-[140px] rounded-xl bg-white/5 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Navbar />

      {/* Spacer for fixed navbar (topbar 52px + subnav 64px) */}
      <div className="h-[116px]" />

      {/* Hero only on home */}
      {!cat && !search && <HeroBanner />}

      <div className="px-11 py-10 space-y-14">
        {filtered ? (
          <>
            <h2 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px' }}>
              {getCategoryTitle()}
            </h2>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40 text-lg mb-2">No se encontraron resultados</p>
                <p className="text-white/20 text-sm">Intenta con otra búsqueda o explora por categorías</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filtered.map((content) => (
                  <div
                    key={content.id}
                    className="relative rounded-lg overflow-hidden cursor-pointer group h-[280px]"
                    onClick={() => window.location.href = `/contenido/${content.id}`}
                  >
                    <img src={content.image} alt={content.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    {content.isNew && (
                      <span className="absolute top-0 left-0 bg-[#FFE600] text-black text-[10px] font-bold px-2 py-1 rounded-br-lg">NUEVO</span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white/50 text-[10px]">{content.type} · {content.genre}</p>
                      <p className="text-white font-semibold text-sm">{content.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Ads banner */}
            <div className="relative rounded-xl overflow-hidden h-[120px] flex items-center px-12"
              style={{ background: 'linear-gradient(135deg, #FFE600 0%, #FFA500 100%)' }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative z-10">
                <p className="text-black font-bold" style={{ fontSize: '24px' }}>SUSCRÍBETE AHORA CON UN 10% OFF</p>
                <p className="text-black/60 text-sm">Accede a todo el contenido sin límites. Primeros 3 meses gratis.</p>
              </div>
              <button className="ml-auto relative z-10 bg-black text-[#FFE600] px-6 py-3 rounded-lg font-bold text-sm hover:bg-black/80 transition-colors">
                Ver planes
              </button>
            </div>

            {/* Content rows */}
            <ContentRow title="Top recomendados" contents={TOP_RECOMMENDED} cardSize="lg" />
            <ContentRow title="Series del momento" contents={NEW_SERIES} cardSize="md" />
            <ContentRow title="Contenido destacado" contents={DESTACADOS} horizontal={true} />
            <ContentRow
              title="Películas populares"
              contents={CONTENTS.filter((c) => c.category === 'pelicula')}
              cardSize="md"
            />
            <ContentRow
              title="Para los más pequeños"
              contents={CONTENTS.filter((c) => c.category === 'infantil')}
              cardSize="sm"
            />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-11 py-8 mt-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-white font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Mercado <span style={{ color: '#FFE600' }}>Play</span></p>
          <div className="flex items-center gap-6">
            {['Ayuda', 'Términos y condiciones', 'Privacidad', 'Contacto'].map((item) => (
              <button key={item} className="text-white/30 text-xs hover:text-white/60 transition-colors">{item}</button>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2024 Mercado Libre. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}