import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import imgLogo from "figma:asset/00aa209b14283fbb100a73813cc5828d9e68ce18.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'platform' | 'community' | 'no-account'>('platform');
  const [hasCommunity, setHasCommunity] = useState<boolean | null>(null);

  const handleHasCommunity = (value: boolean) => {
    setHasCommunity(value);
    if (value) {
      setTimeout(() => navigate('/onboarding'), 300);
    } else {
      setStep('no-account');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-5%] w-[400px] h-[400px] bg-[#FFE600]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-blue-500/4 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <img src={imgLogo} alt="Mercado Libre" className="h-10 object-contain" />
          </div>
          <h1 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px' }}>
            Mercado <span style={{ color: '#FFE600' }}>Play</span>
          </h1>
        </div>

        {step === 'platform' && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-white mb-2 text-xl font-bold">Ingresar a la plataforma</h2>
            <p className="text-white/50 text-sm mb-8">Accede con tu cuenta de Mercado Libre</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-white/60 text-xs mb-1.5 block">Email o usuario</label>
                <input
                  type="email"
                  defaultValue="usuario@mercadolibre.com"
                  className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#FFE600]/60 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1.5 block">Contraseña</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#FFE600]/60 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('community')}
              className="w-full bg-[#FFE600] text-black py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
            >
              Ingresar <ArrowRight size={16} />
            </button>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/40 text-xs">¿No tienes cuenta de Mercado Libre?</p>
              <button
                onClick={() => handleHasCommunity(false)}
                className="text-[#FFE600] text-xs mt-1 hover:underline"
              >
                Ingresar como invitado
              </button>
            </div>
          </div>
        )}

        {step === 'community' && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-[#FFE600]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FFE600]/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="#FFE600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-white mb-2 text-xl font-bold">¿Tienes perfil de comunidad?</h2>
            <p className="text-white/50 text-sm mb-8">
              Con un perfil de comunidad puedes compartir y recibir recomendaciones de amigos y familia.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleHasCommunity(true)}
                className="w-full bg-[#FFE600] text-black py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors"
              >
                Sí, tengo perfil de comunidad
              </button>
              <button
                onClick={() => handleHasCommunity(false)}
                className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                No, ingresar sin comunidad
              </button>
            </div>
          </div>
        )}

        {step === 'no-account' && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <X size={28} className="text-red-400" />
            </div>
            <h2 className="text-white mb-2 text-xl font-bold">Sin perfil de comunidad</h2>
            <p className="text-white/50 text-sm mb-8">
              Sin un perfil de comunidad no podrás compartir recomendaciones ni ver las de tus amigos.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full bg-[#FFE600] text-black py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors"
              >
                Continuar como invitado
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-transparent text-white/60 py-3 rounded-lg font-semibold text-sm hover:text-white transition-colors"
              >
                Volver a Mercado Libre
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}