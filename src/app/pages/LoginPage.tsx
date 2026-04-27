import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="h-7 bg-[#FFE600] flex items-center justify-center">
        <span className="text-[10px] font-black text-black tracking-wide">MERCADO LIBRE</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#FFE600] rounded-xl flex items-center justify-center mb-4">
              <svg viewBox="0 0 40 40" className="w-7 h-7"><polygon points="12,8 32,20 12,32" fill="#0A0A0A" /></svg>
            </div>
            <h1 className="text-[22px] font-black text-white">Ingresa a Mercado Play</h1>
            <p className="text-[13px] text-[#555] mt-1">Con tu cuenta de Mercado Libre</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-[4px] px-4 py-3 text-[13px] text-white placeholder:text-[#555] outline-none focus:border-[#FFE600] transition-colors"
            />
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1C1C1C] border border-[#2E2E2E] rounded-[4px] px-4 py-3 pr-10 text-[13px] text-white placeholder:text-[#555] outline-none focus:border-[#FFE600] transition-colors"
              />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button
              type="submit"
              className="bg-[#FFE600] text-black font-black text-[14px] py-3 rounded-[4px] hover:bg-[#FFF066] transition-colors mt-1"
            >
              Ingresar
            </button>
          </form>

          <div className="text-center mt-4">
            <button className="text-[12px] text-[#555] hover:text-[#888] transition-colors">¿Olvidaste tu contraseña?</button>
          </div>
          <div className="border-t border-[#1C1C1C] mt-6 pt-6 text-center">
            <p className="text-[12px] text-[#555] mb-3">¿No tenés cuenta?</p>
            <button className="w-full border border-[#2E2E2E] text-white text-[13px] font-semibold py-3 rounded-[4px] hover:border-[#3A3A3A] transition-colors">
              Crear cuenta en Mercado Libre
            </button>
          </div>
          <div className="text-center mt-4">
            <button onClick={() => navigate('/profile')} className="text-[12px] text-[#555] hover:text-[#888]">
              Continuar como invitado
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
