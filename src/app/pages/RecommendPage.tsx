import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Send } from 'lucide-react'
import { catalog, allContacts, groups } from '../data/content'
import { useApp } from '../context'

export default function RecommendPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addRecommendation, hasProfile } = useApp()
  const item = catalog.find(c => c.id === id)

  const [selected, setSelected] = useState<string[]>([])
  const [message, setMessage]   = useState('')
  const [sent, setSent]         = useState(false)

  if (!item) return null

  const toggle = (cid: string) =>
    setSelected(prev => prev.includes(cid) ? prev.filter(x => x !== cid) : [...prev, cid])

  const handleSend = () => {
    selected.forEach(cid => addRecommendation(id!, cid))
    setSent(true)
    setTimeout(() => navigate(-1), 2000)
  }

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-5xl">👤</div>
        <div className="text-center">
          <h2 className="text-[20px] font-black text-white mb-2">Necesitas un perfil</h2>
          <p className="text-[13px] text-[#555]">Crea tu perfil de comunidad para recomendar contenido a amigos y familia.</p>
        </div>
        <button onClick={() => navigate('/profile')} className="bg-[#FFE600] text-black font-black text-[14px] py-3 px-8 rounded-[4px]">
          Crear perfil
        </button>
        <button onClick={() => navigate(-1)} className="text-[12px] text-[#555]">Volver</button>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-white" />
          </div>
          <h2 className="text-[18px] font-black text-white mb-1">¡Recomendado!</h2>
          <p className="text-[13px] text-[#555]">
            {selected.length === 1
              ? `Enviado a ${allContacts.find(c => c.id === selected[0])?.name}`
              : `Enviado a ${selected.length} personas`}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#1C1C1C]">
        <div className="h-7 bg-[#FFE600] flex items-center justify-center">
          <span className="text-[10px] font-black text-black">MERCADO LIBRE</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => navigate(-1)} className="text-[#888] hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-[15px] font-black text-white">Recomendar</h1>
            <p className="text-[11px] text-[#555]">{item.emoji} {item.title}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Contacts by group */}
        {groups.map(g => (
          <div key={g.id} className="mb-2">
            <div className="px-5 py-2 bg-[#0A0A0A] sticky top-0">
              <p className="text-[10px] font-black text-[#555] uppercase tracking-wider">{g.name}</p>
            </div>
            {g.members.map(contact => (
              <button
                key={contact.id}
                onClick={() => toggle(contact.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 transition-colors ${selected.includes(contact.id) ? 'bg-[rgba(255,230,0,0.05)]' : 'hover:bg-[#141414]'}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-black text-[14px] shrink-0"
                  style={{ background: contact.color }}>
                  {contact.initial}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[13px] font-semibold text-white">{contact.name}</p>
                  <p className="text-[11px] text-[#555]">{contact.groupName}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  selected.includes(contact.id) ? 'bg-[#FFE600] border-[#FFE600]' : 'border-[#3A3A3A]'
                }`}>
                  {selected.includes(contact.id) && <Check size={11} className="text-black" />}
                </div>
              </button>
            ))}
          </div>
        ))}

        {/* Message */}
        <div className="px-5 py-4 border-t border-[#1C1C1C]">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={140}
            placeholder="Agrega un mensaje (opcional)..."
            className="w-full bg-[#1C1C1C] border border-[#2E2E2E] rounded-[4px] px-3 py-2.5 text-[12px] text-white placeholder:text-[#555] outline-none focus:border-[#FFE600] resize-none h-16 leading-relaxed"
          />
          <p className="text-[10px] text-right text-[#555] mt-1">{message.length} / 140</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 py-4 border-t border-[#1C1C1C] bg-[#0A0A0A]">
        <button
          disabled={selected.length === 0}
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 bg-[#FFE600] text-black font-black text-[14px] py-3.5 rounded-[4px] hover:bg-[#FFF066] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send size={14} />
          {selected.length === 0
            ? 'Selecciona destinatarios'
            : `Recomendar a ${selected.length} ${selected.length === 1 ? 'persona' : 'personas'}`
          }
        </button>
      </div>
    </div>
  )
}
