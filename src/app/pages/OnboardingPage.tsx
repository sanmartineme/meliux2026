import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Send,
  Star,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
} from 'lucide-react';
import imgLogo from 'figma:asset/00aa209b14283fbb100a73813cc5828d9e68ce18.png';

const SLIDES = [
  {
    id: 'welcome',
    tag: 'Nuevo en Mercado Play',
    title: 'Tu entretenimiento,\nahora más social',
    description:
      'Descubre una nueva forma de disfrutar el streaming: comparte, recomienda y conecta con las personas que más quieres.',
    image:
      'https://images.unsplash.com/photo-1648737154448-ccf0cafae1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    icon: <Play size={22} className="text-black" />,
    accent: '#FFE600',
    pill: '¡Nuevo!',
    features: null,
  },
  {
    id: 'notifications',
    tag: 'Recomendaciones recibidas',
    title: 'Recibe sugerencias\nde amigos y familia',
    description:
      'Cuando alguien de tu red te recomienda una serie o película, recibirás una notificación con su mensaje personal.',
    image:
      'https://images.unsplash.com/photo-1654764450223-08d4e8a297ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    icon: <Bell size={22} className="text-black" />,
    accent: '#FFE600',
    pill: 'Novedades',
    features: [
      { icon: <Bell size={14} />, text: 'Notificación instantánea en la campana 🔔' },
      { icon: <Star size={14} />, text: 'Verás la calificación y el mensaje de tu contacto' },
      { icon: <Play size={14} />, text: 'Un clic y empieza la reproducción' },
    ],
    mockNotif: true,
  },
  {
    id: 'recommend',
    tag: 'Comparte lo que amas',
    title: 'Recomienda contenido\na quien quieras',
    description:
      'Desde cualquier película o serie, toca "Recomendar" y elige a quién enviársela con un mensaje personalizado.',
    image:
      'https://images.unsplash.com/photo-1762944891945-0dd0a256b91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    icon: <Send size={22} className="text-black" />,
    accent: '#a78bfa',
    pill: 'Social',
    features: [
      { icon: <Send size={14} />, text: 'Envía recomendaciones desde el detalle del contenido' },
      { icon: <Users size={14} />, text: 'Elige uno o varios contactos de tu red' },
      { icon: <Star size={14} />, text: 'Agrega tu opinión o calificación personal' },
    ],
    mockNotif: false,
  },
  {
    id: 'ratings',
    tag: 'Tu opinión importa',
    title: 'Califica y lee las\nopiniones de tu red',
    description:
      'Puntúa lo que viste y mira qué piensan tus amigos. Las recomendaciones más relevantes aparecen primero.',
    image:
      'https://images.unsplash.com/photo-1648737154448-ccf0cafae1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80',
    icon: <Star size={22} className="text-black" />,
    accent: '#f97316',
    pill: 'Calificaciones',
    features: [
      { icon: <Star size={14} />, text: 'Sistema de estrellas del 1 al 5' },
      { icon: <Users size={14} />, text: 'Comentarios de amigos en cada título' },
      { icon: <Bell size={14} />, text: 'Tus calificaciones se comparten con tu red' },
    ],
    mockNotif: false,
  },
];

function MockNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] bg-[#13131f]/95 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10"
    >
      <div className="border-l-4 border-[#FFE600] px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs leading-snug">
              <span className="font-semibold">Ana (tu hermana)</span> te recomendó{' '}
              <span className="text-[#FFE600]">El Último Horizonte</span> 🎬
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button className="bg-[#FFE600] text-black text-[10px] font-bold px-3 py-1 rounded-full">
                Ver ahora
              </button>
              <span className="text-white/30 text-[10px]">Hace 8 min</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  useEffect(() => {
    if (!autoplay || isLast) return;
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((c) => c + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, autoplay, isLast]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setAutoplay(false);
  };

  const next = () => {
    if (isLast) {
      navigate('/perfil');
    } else {
      setDirection(1);
      setCurrent((c) => c + 1);
      setAutoplay(false);
    }
  };

  const prev = () => {
    if (current === 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
    setAutoplay(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col overflow-hidden relative">
      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <img src={imgLogo} alt="Mercado Libre" className="h-7 object-contain opacity-80" />
          <span
            className="text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}
          >
            Mercado <span style={{ color: '#FFE600' }}>Play</span>
          </span>
        </div>
        <button
          onClick={() => navigate('/perfil')}
          className="text-white/40 hover:text-white/70 transition-colors text-sm"
        >
          Omitir →
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-0 px-4 pb-6 max-w-6xl mx-auto w-full">

        {/* Left: image panel */}
        <div className="relative w-full lg:w-[52%] h-[260px] lg:h-[520px] rounded-2xl lg:rounded-3xl overflow-hidden shrink-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + '-img'}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/60 via-transparent to-transparent lg:hidden" />

              {/* Pill tag on image */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-[10px] font-bold px-3 py-1.5 rounded-full"
                  style={{ background: slide.accent, color: '#000' }}
                >
                  {slide.pill}
                </span>
              </div>

              {/* Mock notification overlay */}
              {slide.mockNotif && <MockNotification />}
            </motion.div>
          </AnimatePresence>

          {/* Step dots — mobile */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:hidden z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  background: i === current ? '#FFE600' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: text panel */}
        <div className="w-full lg:w-[48%] lg:pl-14 flex flex-col justify-center pt-4 lg:pt-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + '-text'}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, y: d * 30 }),
                center: { opacity: 1, y: 0 },
                exit: (d: number) => ({ opacity: 0, y: d * -20 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Tag */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: slide.accent }}
                >
                  {slide.icon}
                </div>
                <span className="text-white/50 text-xs font-medium uppercase tracking-widest">
                  {slide.tag}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-white mb-4 whitespace-pre-line"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(26px, 4vw, 40px)',
                  lineHeight: 1.15,
                }}
              >
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-[400px]">
                {slide.description}
              </p>

              {/* Feature list */}
              {slide.features && (
                <ul className="space-y-3 mb-8">
                  {slide.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: slide.accent + '22', color: slide.accent }}
                      >
                        {f.icon}
                      </div>
                      <span className="text-white/70 text-sm">{f.text}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {!slide.features && <div className="mb-8" />}

              {/* Navigation */}
              <div className="flex items-center gap-4">
                {/* Prev */}
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Next / Empezar */}
                <button
                  onClick={next}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: slide.accent }}
                >
                  {isLast ? (
                    <>
                      Empezar a explorar <Play size={15} className="fill-black" />
                    </>
                  ) : (
                    <>
                      Siguiente <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step dots — desktop */}
          <div className="hidden lg:flex items-center gap-2 mt-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 7,
                  height: 7,
                  background: i === current ? slide.accent : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
            <span className="text-white/30 text-xs ml-3">
              {current + 1} / {SLIDES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          key={current}
          className="h-full"
          style={{ background: slide.accent }}
          initial={{ width: '0%' }}
          animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}