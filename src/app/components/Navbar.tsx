import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Search, Bell, ChevronDown, Star, Send, X } from 'lucide-react';
import imgLogo from "figma:asset/00aa209b14283fbb100a73813cc5828d9e68ce18.png";

interface NavbarProps {
  profileName?: string;
}

// Shared notification body used by both dropdown and bottom sheet
function NotifContent({
  notifDismissed,
  onDismissAll,
  onNavigate,
}: {
  notifDismissed: boolean;
  onDismissAll: () => void;
  onNavigate: () => void;
}) {
  return (
    <>
      {!notifDismissed ? (
        <div className="px-5 py-4 bg-[#FFE600]/5 border-l-4 border-[#FFE600]">
          {/* Sender info */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-sm leading-snug">
                <span className="font-semibold text-white">Ana (tu hermana)</span>
                {' '}te recomendó una película que le encantó 🎬
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                Hace 8 minutos · <Send size={10} className="inline -mt-0.5" /> Recomendación
              </p>
            </div>
          </div>

          {/* Recommended content card */}
          <div
            className="mt-3 flex gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 cursor-pointer"
            onClick={onNavigate}
          >
            <img
              src="https://images.unsplash.com/photo-1632770592064-5a98f5b1e66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80"
              alt="El Último Horizonte"
              className="w-16 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">El Último Horizonte</p>
              <p className="text-white/50 text-xs mt-0.5">Película · Acción · 2024</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={11} className="text-[#FFE600] fill-[#FFE600]" />
                <span className="text-white/70 text-xs">4.8</span>
                <span className="text-white/30 text-xs mx-1">·</span>
                <span className="text-white/50 text-xs">ATP</span>
              </div>
              <p className="text-white/40 text-xs mt-1.5 italic leading-snug line-clamp-2">
                "¡Increíble película! Los efectos visuales son alucinantes, ¡tienes que verla!"
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onNavigate}
            className="mt-3 w-full bg-[#FFE600] hover:bg-yellow-400 transition-colors text-black text-xs font-semibold rounded-lg py-2.5"
          >
            Ver ahora
          </button>
        </div>
      ) : (
        <div className="px-5 py-12 text-center">
          <Bell size={32} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No hay notificaciones nuevas</p>
        </div>
      )}

      {/* Empty state footer */}
      {!notifDismissed && (
        <div className="px-5 py-4 text-center border-t border-white/5">
          <p className="text-white/20 text-xs">No hay más notificaciones nuevas</p>
        </div>
      )}
    </>
  );
}

export function Navbar({ profileName = 'Carlos' }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const [notifDismissed, setNotifDismissed] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Desktop: close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobile: animate bottom sheet in
  useEffect(() => {
    if (notifOpen) {
      const t = setTimeout(() => setSheetVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setSheetVisible(false);
    }
  }, [notifOpen]);

  const handleOpenNotif = () => {
    setNotifOpen((v) => !v);
    setNotifRead(true);
  };

  const handleCloseSheet = () => {
    setSheetVisible(false);
    setTimeout(() => setNotifOpen(false), 300);
  };

  const handleNavigateToContent = () => {
    navigate('/contenido/1');
    setNotifOpen(false);
    setSheetVisible(false);
  };

  const navLinks = [
    { label: 'Inicio', path: '/home' },
    { label: 'Series', path: '/home?cat=serie' },
    { label: 'Películas', path: '/home?cat=pelicula' },
    { label: 'Infantil', path: '/home?cat=infantil' },
  ];

  const isActive = (path: string) => {
    if (path === '/home' && !location.search) return location.pathname === '/home';
    return location.pathname + location.search === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/home?search=${encodeURIComponent(searchValue)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#FFE600] flex items-center justify-between px-7 h-[52px]">
        <div className="flex items-center gap-2">
          <img src={imgLogo} alt="Mercado Libre" className="h-[36px] object-contain" />
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/perfil')}
            className="text-black/70 text-sm hover:text-black transition-colors font-medium"
          >
            Tu perfil
          </button>
          <button className="text-black/70 text-sm hover:text-black transition-colors font-medium">
            Ayuda
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="fixed top-[52px] left-0 right-0 z-40 bg-[rgba(10,10,20,0.92)] backdrop-blur-md border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between md:h-16">
        {/* Top row */}
        <div className="flex items-center justify-between px-7 h-16 md:h-auto md:flex-1">
          {/* Logo + Desktop Nav Links */}
          <div className="flex items-center gap-0">
            <button
              onClick={() => navigate('/home')}
              className="hidden md:block text-white mr-10 shrink-0"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '22px' }}
            >
              Mercado Play
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`text-sm transition-colors font-medium ${
                    isActive(link.path)
                      ? 'text-white border-b-2 border-[#FFE600] pb-0.5'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Search + User */}
          <div className="flex items-center gap-4">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-1.5 border border-white/30">
                  <Search size={16} className="text-white/60 mr-2" />
                  <input
                    autoFocus
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Buscar en Mercado Play"
                    className="bg-transparent text-white text-sm outline-none w-56 placeholder:text-white/50"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-white/60 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-1.5 transition-colors flex-1 md:flex-none justify-start"
              >
                <Search size={16} className="text-white/70 shrink-0" />
                <span className="text-white/60 text-sm truncate">Buscar en Mercado Play</span>
              </button>
            )}

            {/* Bell — desktop uses relative dropdown, mobile triggers bottom sheet */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={handleOpenNotif}
                className="relative text-white/70 hover:text-white transition-colors"
              >
                <Bell size={20} />
                {!notifRead && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFE600] border-2 border-[#0a0a14]" />
                )}
              </button>

              {/* ── DESKTOP DROPDOWN (md and up) ── */}
              {notifOpen && (
                <div className="hidden md:block absolute right-0 top-10 w-[340px] bg-[#13131f] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <span className="text-white font-semibold text-sm">Notificaciones</span>
                    <span
                      className={`text-xs font-medium transition-colors ${
                        notifDismissed
                          ? 'text-white/20 cursor-not-allowed'
                          : 'text-[#FFE600] cursor-pointer hover:underline'
                      }`}
                      onClick={() => { if (!notifDismissed) setNotifDismissed(true); }}
                    >
                      Marcar todo como leído
                    </span>
                  </div>
                  <NotifContent
                    notifDismissed={notifDismissed}
                    onDismissAll={() => setNotifDismissed(true)}
                    onNavigate={handleNavigateToContent}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/perfil')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center text-black font-bold text-sm">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Mobile sub-menu */}
        <div className="md:hidden flex items-center gap-1 px-5 pb-3 border-t border-white/10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors font-medium ${
                isActive(link.path)
                  ? 'text-black bg-[#FFE600]'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MOBILE BOTTOM SHEET (below md) ── */}
      {notifOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: sheetVisible ? 1 : 0 }}
            onClick={handleCloseSheet}
          />

          {/* Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-[70] bg-[#13131f] rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out"
            style={{ transform: sheetVisible ? 'translateY(0)' : 'translateY(100%)' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-white font-semibold text-sm">Notificaciones</span>
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-medium transition-colors ${
                    notifDismissed
                      ? 'text-white/20 cursor-not-allowed'
                      : 'text-[#FFE600] cursor-pointer hover:underline'
                  }`}
                  onClick={() => { if (!notifDismissed) setNotifDismissed(true); }}
                >
                  Marcar todo como leído
                </span>
                <button onClick={handleCloseSheet} className="text-white/40 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] pb-8">
              <NotifContent
                notifDismissed={notifDismissed}
                onDismissAll={() => setNotifDismissed(true)}
                onNavigate={() => { navigate('/contenido/1'); handleCloseSheet(); }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
