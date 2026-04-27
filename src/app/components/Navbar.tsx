import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, User } from 'lucide-react'
import { useApp } from '../context'

const NAV_ITEMS = ['Inicio', 'Series', 'Películas', 'Infantil']

export default function Navbar({ active = 'Inicio' }: { active?: string }) {
  const { hasProfile, profileName } = useApp()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50">
      {/* ML yellow bar */}
      <div className="h-7 bg-[#FFE600] flex items-center justify-center">
        <span className="text-[10px] font-black text-black tracking-wide">MERCADO LIBRE</span>
      </div>
      {/* Nav */}
      <nav className="h-[52px] bg-[#0A0A0A] border-b border-[#1C1C1C] flex items-center px-6 gap-6">
        <Link to="/home" className="text-[13px] font-black text-white shrink-0">Mercado Play</Link>
        <div className="flex items-center flex-1 justify-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              className={`px-3 h-[52px] text-[13px] transition-colors border-b-2 ${
                item === active
                  ? 'text-white border-[#FFE600]'
                  : 'text-[#888] border-transparent hover:text-[#CCC]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1C1C1C] border border-[#2E2E2E] rounded-full px-3 py-1.5 w-44">
            <Search size={12} className="text-[#555]" />
            <input
              placeholder="Buscar títulos..."
              className="bg-transparent text-[12px] text-white outline-none placeholder:text-[#555] flex-1"
            />
          </div>
          <button className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center text-[#888] hover:text-white transition-colors">
            <Bell size={14} />
          </button>
          {hasProfile ? (
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center text-[10px] font-black text-black"
            >
              {profileName.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center text-[#888] hover:text-white transition-colors"
            >
              <User size={14} />
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
