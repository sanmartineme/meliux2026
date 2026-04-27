import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { Play, Info, Star, Share2, ArrowLeft, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { getContentById, CONTENTS } from '../data/content';

/* ─── Mock data por contenido ─────────────────────────────────── */
const CONTENT_DETAILS: Record<string, { director: string; cast: string[]; genres: string[] }> = {
  '1': {
    director: 'Sebastián Montoya',
    cast: ['Rodrigo Fernández', 'Laura Vargas', 'Miguel Torres', 'Sandra Ríos', 'Carlos Medina', 'Valeria Romero'],
    genres: ['Acción', 'Aventura', 'Suspenso', 'Ciencia ficción'],
  },
  '2': {
    director: 'Ana Gutiérrez',
    cast: ['Pedro Álvarez', 'Sofía Herrera', 'Diego Castro', 'Natalia Fuentes', 'Martín Ruiz', 'Paula Díaz'],
    genres: ['Drama', 'Suspenso', 'Misterio'],
  },
  '3': {
    director: 'Jorge Castillo',
    cast: ['Andrea Morales', 'Tomás Vega', 'Carmen Soto', 'Felipe Reyes', 'Lucía Navarro'],
    genres: ['Thriller', 'Acción', 'Suspenso'],
  },
  '4': {
    director: 'María Fernández',
    cast: ['Roberto Salinas', 'Claudia Rojas', 'Emilio Vargas', 'Lorena Pinto', 'Héctor Cruz'],
    genres: ['Comedia', 'Romance', 'Drama'],
  },
};

const getDetails = (id: string, genre: string) =>
  CONTENT_DETAILS[id] ?? {
    director: 'Carlos Mendoza',
    cast: ['Alejandro Vega', 'Isabel Torres', 'Roberto Lima', 'Carmen Blanco', 'Fabio Ríos', 'Laura Sanz'],
    genres: [genre, 'Drama', 'Entretenimiento'],
  };

/* ─── Episodios mock (series) ─────────────────────────────────── */
const MOCK_EPISODES = [
  { num: 1, title: 'El comienzo', duration: '48 min', desc: 'Los protagonistas se conocen en circunstancias inesperadas.' },
  { num: 2, title: 'Sin retorno', duration: '51 min', desc: 'Una decisión lo cambia todo para el grupo.' },
  { num: 3, title: 'La verdad oculta', duration: '46 min', desc: 'Surgen los primeros secretos del pasado familiar.' },
  { num: 4, title: 'Fracturas', duration: '49 min', desc: 'Las relaciones se ponen a prueba ante la presión.' },
  { num: 5, title: 'El punto de quiebre', duration: '52 min', desc: 'Todo llega a un punto de no retorno.' },
];

export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const content = getContentById(id || '');

  const isSeries = content?.type === 'Serie';
  const TABS = isSeries
    ? ['Episodios', 'Títulos similares', 'Detalle']
    : ['Títulos similares', 'Detalle'];

  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Contenido no encontrado</p>
          <button onClick={() => navigate('/home')} className="text-[#FFE600] hover:underline">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const details = getDetails(id || '', content.genre);
  const related = CONTENTS.filter((c) => c.id !== content.id && c.genre === content.genre).slice(0, 6);
  const moreContent = CONTENTS.filter((c) => c.id !== content.id).slice(0, 6);
  const similarItems = related.length >= 3 ? related : moreContent;

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />
      <div className="h-[116px]" />

      {/* ── HERO full-width ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: '580px' }}>
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${content.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm bg-black/30 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/10"
        >
          <ArrowLeft size={14} /> Volver
        </button>

        {/* Content info — bottom-left */}
        <div className="absolute left-11 bottom-14 max-w-xl z-10">
          {content.isNew && (
            <span className="inline-block bg-[#FFE600] text-black text-xs font-bold px-2 py-0.5 rounded mb-3">
              NUEVO
            </span>
          )}

          <h1
            className="text-white mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: 1.1 }}
          >
            {content.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-white/70 text-sm mb-3">
            <span className="border border-white/40 px-1.5 py-0.5 rounded text-xs">
              {content.classification}
            </span>
            <span>{content.genre}</span>
            <span className="text-white/40">·</span>
            <span>{content.duration}</span>
            <span className="text-white/40">·</span>
            <span>{content.year}</span>
            {isSeries && content.episodes && (
              <>
                <span className="text-white/40">·</span>
                <span>{content.episodes} episodios</span>
              </>
            )}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1.5 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={
                  star <= Math.round(content.rating)
                    ? 'text-[#FFE600] fill-[#FFE600]'
                    : 'text-white/30'
                }
              />
            ))}
            <span className="text-white/60 text-sm ml-1">
              {content.rating} ({content.votes.toLocaleString('es')} valoraciones)
            </span>
          </div>

          <p className="text-white/75 text-sm mb-6 leading-relaxed max-w-md">
            {content.description}
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate(`/reproducir/${content.id}`)}
              className="flex items-center gap-2 bg-[#FFE600] text-black px-6 py-3 rounded font-bold text-sm hover:bg-yellow-300 transition-colors"
            >
              <Play size={16} fill="black" />
              {isSeries ? 'Ver episodio 1' : 'Ver ahora'}
            </button>
            <button
              onClick={() => navigate(`/recomendar/${content.id}`)}
              className="flex items-center gap-2 bg-white/10 text-white px-5 py-3 rounded border border-white/20 font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              <Share2 size={15} />
              Recomendar
            </button>
          </div>

          {/* Amigos que vieron */}
          {content.friends && content.friends.length > 0 && (
            <div className="flex items-center gap-2 mt-5">
              <Users size={14} className="text-[#FFE600]" />
              <span className="text-white/50 text-xs">
                <span className="text-white/80 font-medium">{content.friends[0].name}</span>
                {content.friends.length > 1 && (
                  <> y <span className="text-white/80 font-medium">{content.friends.length - 1} persona más</span></>
                )}{' '}
                {content.friends.length === 1 ? 'vio este contenido' : 'vieron este contenido'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── TABS ────────────────────────────────────────────────────── */}
      <div className="bg-[#0a0a14] border-b border-white/10 px-11">
        <div className="flex items-center gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? 'text-white border-[#FFE600]'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────── */}
      <div className="bg-[#0a0a14] px-11 py-10">

        {/* ── EPISODIOS ── */}
        {activeTab === 'Episodios' && isSeries && (
          <div className="max-w-3xl space-y-3">
            {MOCK_EPISODES.map((ep) => (
              <div
                key={ep.num}
                className="flex items-center gap-5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-xl p-4 cursor-pointer transition-colors group"
                onClick={() => navigate(`/reproducir/${content.id}`)}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center shrink-0 group-hover:bg-[#FFE600]/20 transition-colors">
                  <Play size={14} className="text-[#FFE600] ml-0.5" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white/40 text-xs">Ep. {ep.num}</span>
                    <span className="text-white text-sm font-semibold">{ep.title}</span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">{ep.desc}</p>
                </div>
                <span className="text-white/30 text-xs shrink-0">{ep.duration}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── TÍTULOS SIMILARES ── */}
        {activeTab === 'Títulos similares' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {similarItems.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/contenido/${item.id}`)}
              >
                <div
                  className="relative rounded-lg overflow-hidden mb-2"
                  style={{ aspectRatio: '2/3' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {item.isNew && (
                    <span className="absolute top-0 left-0 bg-[#FFE600] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-br">
                      NUEVO
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-[#FFE600]/90 flex items-center justify-center">
                      <Play size={16} fill="black" className="text-black ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <Star size={11} className="text-[#FFE600] fill-[#FFE600]" />
                    <span className="text-white text-xs">{item.rating}</span>
                  </div>
                </div>
                <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{item.type} · {item.genre}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── DETALLE ── 3 columnas ── */}
        {activeTab === 'Detalle' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Col 1: Acerca de */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Acerca de</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-1.5">Sinopsis</p>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {content.summary || content.description}
                  </p>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-1">Estreno</p>
                  <p className="text-white/55 text-sm">{content.year}</p>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-1">Duración</p>
                  <p className="text-white/55 text-sm">{content.duration}</p>
                </div>
                {isSeries && content.episodes && (
                  <div>
                    <p className="text-white/90 text-sm font-semibold mb-1">Episodios</p>
                    <p className="text-white/55 text-sm">{content.episodes}</p>
                  </div>
                )}
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">Clasificación</p>
                  <span className="inline-block bg-white/10 text-white/80 text-[11px] font-bold px-2 py-0.5 rounded border border-white/20">
                    {content.classification}
                  </span>
                </div>
              </div>
            </div>

            {/* Col 2: Dirección y reparto */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Dirección y reparto</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-1.5">Creado por</p>
                  <p className="text-[#FFE600] text-sm underline cursor-pointer hover:text-yellow-300 transition-colors">
                    {details.director}
                  </p>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">Reparto</p>
                  <div className="space-y-1.5">
                    {details.cast.map((name) => (
                      <p
                        key={name}
                        className="text-[#FFE600] text-sm underline cursor-pointer hover:text-yellow-300 transition-colors"
                      >
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Géneros */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {details.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-sm bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a14] px-11 py-8 mt-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-white font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
            Mercado <span style={{ color: '#FFE600' }}>Play</span>
          </p>
          <div className="flex items-center gap-6">
            {['Ayuda', 'Términos y condiciones', 'Privacidad', 'Contacto'].map((item) => (
              <button key={item} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {item}
              </button>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2024 Mercado Libre. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}