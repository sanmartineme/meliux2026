import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Plus, X } from 'lucide-react'
import { useApp } from '../context'
import { groups } from '../data/content'

const AVATARS = ['🦁', '🐺', '🦊', '🐻', '🐼', '🦝', '🦋', '🌟']
const COLORS  = ['#FFE600', '#1565C0', '#2E7D32', '#FF6B35', '#9C27B0', '#E53935']

export default function ProfilePage() {
  const { hasProfile, profileName, setProfile } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState<'create' | 'groups' | 'done'>(hasProfile ? 'done' : 'create')
  const [name, setName] = useState(profileName)
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)

  if (step === 'done') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <div className="h-7 bg-[#FFE600] flex items-center justify-center">
          <span className="text-[10px] font-black text-black">MERCADO LIBRE</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
            style={{ background: COLORS[selectedColor], boxShadow: `0 0 40px ${COLORS[selectedColor]}50` }}>
            {AVATARS[selectedAvatar]}
          </div>
          <div className="text-center">
            <h2 className="text-[22px] font-black text-white">{profileName || 'Mi perfil'}</h2>
            <p className="text-[13px] text-[#555] mt-1">Perfil de comunidad activo</p>
          </div>
          {/* Groups */}
          <div className="w-full max-w-xs">
            <p className="text-[11px] font-black text-[#555] uppercase tracking-wider mb-3">Mis grupos</p>
            {groups.map(g => (
              <div key={g.id} className="flex items-center justify-between py-3 border-b border-[#1C1C1C]">
                <div>
                  <p className="text-[13px] font-semibold text-white">{g.name}</p>
                  <p className="text-[11px] text-[#555]">{g.members.length} miembros</p>
                </div>
                <div className="flex -space-x-1.5">
                  {g.members.slice(0,3).map(m => (
                    <div key={m.id} className="w-6 h-6 rounded-full border border-[#0A0A0A] flex items-center justify-center text-[9px] font-black text-black"
                      style={{ background: m.color }}>
                      {m.initial}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="flex items-center gap-2 text-[12px] text-[#555] hover:text-[#888] mt-3 transition-colors">
              <Plus size={14} /> Crear nuevo grupo
            </button>
          </div>
          <button onClick={() => navigate('/home')} className="bg-[#FFE600] text-black font-black text-[14px] py-3 px-8 rounded-[4px] hover:bg-[#FFF066] transition-colors">
            Ir al inicio
          </button>
        </div>
      </div>
    )
  }

  if (step === 'groups') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <div className="h-7 bg-[#FFE600] flex items-center justify-center">
          <span className="text-[10px] font-black text-black">MERCADO LIBRE</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 max-w-sm mx-auto w-full">
          <div className="text-center">
            <h2 className="text-[22px] font-black text-white">Tus grupos</h2>
            <p className="text-[13px] text-[#555] mt-1">Conecta con familia y amigos para compartir recomendaciones</p>
          </div>
          <div className="w-full">
            {groups.map(g => (
              <div key={g.id} className="flex items-center gap-3 p-3 rounded-card bg-[#1C1C1C] border border-[#2E2E2E] mb-3">
                <div className="w-10 h-10 rounded-full bg-[#2E2E2E] flex items-center justify-center text-lg">
                  {g.type === 'family' ? '👨‍👩‍👧' : '👥'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white">{g.name}</p>
                  <p className="text-[11px] text-[#555]">{g.members.length} miembros</p>
                </div>
                <Check size={16} className="text-[#2E7D32]" />
              </div>
            ))}
            <button className="flex items-center gap-2 text-[12px] text-[#555] hover:text-[#888] mt-1 transition-colors">
              <Plus size={14} /> Agregar grupo
            </button>
          </div>
          <button onClick={() => { setStep('done') }} className="w-full bg-[#FFE600] text-black font-black text-[14px] py-3 rounded-[4px] hover:bg-[#FFF066] transition-colors">
            Listo
          </button>
          <button onClick={() => navigate('/home')} className="text-[12px] text-[#555] hover:text-[#888]">
            Configurar después
          </button>
        </div>
      </div>
    )
  }

  // step === 'create'
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="h-7 bg-[#FFE600] flex items-center justify-center">
        <span className="text-[10px] font-black text-black">MERCADO LIBRE</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 max-w-sm mx-auto w-full">
        <div className="text-center">
          <h2 className="text-[22px] font-black text-white">Crea tu perfil</h2>
          <p className="text-[13px] text-[#555] mt-1">Para conectar con tu red de confianza</p>
        </div>

        {/* Avatar preview */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all"
          style={{ background: COLORS[selectedColor], boxShadow: `0 0 40px ${COLORS[selectedColor]}40` }}>
          {AVATARS[selectedAvatar]}
        </div>

        {/* Avatar selector */}
        <div className="flex gap-2 flex-wrap justify-center">
          {AVATARS.map((a, i) => (
            <button key={i} onClick={() => setSelectedAvatar(i)}
              className={`w-10 h-10 rounded-full bg-[#1C1C1C] border text-xl flex items-center justify-center transition-colors ${i === selectedAvatar ? 'border-[#FFE600]' : 'border-[#2E2E2E]'}`}>
              {a}
            </button>
          ))}
        </div>

        {/* Color selector */}
        <div className="flex gap-2">
          {COLORS.map((c, i) => (
            <button key={i} onClick={() => setSelectedColor(i)}
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ background: c, borderColor: i === selectedColor ? 'white' : 'transparent' }}>
              {i === selectedColor && <Check size={12} className="text-black" />}
            </button>
          ))}
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Tu nombre en la comunidad"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={30}
          className="w-full bg-[#1C1C1C] border border-[#2E2E2E] rounded-[4px] px-4 py-3 text-[13px] text-white placeholder:text-[#555] outline-none focus:border-[#FFE600] transition-colors"
        />

        <button
          disabled={!name.trim()}
          onClick={() => { setProfile(name.trim()); setStep('groups') }}
          className="w-full bg-[#FFE600] text-black font-black text-[14px] py-3 rounded-[4px] hover:bg-[#FFF066] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Crear perfil
        </button>
        <button onClick={() => navigate('/home')} className="text-[12px] text-[#555] hover:text-[#888]">
          Continuar como invitado
        </button>
      </div>
    </div>
  )
}
