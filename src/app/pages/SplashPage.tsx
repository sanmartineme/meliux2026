import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import imgLogo from "figma:asset/00aa209b14283fbb100a73813cc5828d9e68ce18.png";

const LOADING_DURATION = 3000; // ms totales de carga

export function SplashPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / LOADING_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        // Pequeña pausa antes de navegar para que se vea el 100 %
        setTimeout(() => navigate('/onboarding'), 300);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center relative overflow-hidden">

      {/* Orbes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-15%] left-[-10%] w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,230,0,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[640px] h-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', animationDelay: '1s' }}
        />
      </div>

      {/* Contenido central */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo Mercado Libre */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <img src={imgLogo} alt="Mercado Libre" className="h-14 object-contain" />
        </motion.div>

        {/* Mercado Play wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-baseline gap-2 mb-3"
        >
          <span
            className="text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '52px', lineHeight: 1 }}
          >
            Mercado
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: '52px',
              lineHeight: 1,
              color: '#FFE600',
            }}
          >
            Play
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-white/45 text-base mb-14 tracking-wide"
        >
          Cine, series y más — cuando quieras
        </motion.p>

        {/* Barra de carga */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex flex-col items-center gap-3 w-64"
        >
          {/* Track */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #FFE600 0%, #FFD000 100%)',
                boxShadow: '0 0 8px rgba(255,230,0,0.5)',
              }}
            />
          </div>

          {/* Dots pulsantes mientras carga */}
          {progress < 100 ? (
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                  style={{
                    animation: 'pulse 1.2s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#FFE600] text-xs font-semibold tracking-widest"
            >
              ¡LISTO!
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Footer mínimo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-white/20 text-xs"
      >
        Disponible para suscriptores de Mercado Libre
      </motion.p>
    </div>
  );
}
