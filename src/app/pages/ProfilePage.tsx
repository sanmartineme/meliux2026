import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Edit2, UserX, ArrowLeft, Check } from 'lucide-react';
import { PROFILES, type Profile } from '../data/content';
import imgLogo from "figma:asset/00aa209b14283fbb100a73813cc5828d9e68ce18.png";

const AVATAR_COLORS = ['#FFE600', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function ProfilePage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'select' | 'create' | 'edit'>('select');
  const [selected, setSelected] = useState<Profile | null>(null);
  const [newName, setNewName] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>(PROFILES);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);

  const handleSelectProfile = (profile: Profile) => {
    setSelected(profile);
    setTimeout(() => {
      navigate('/home');
    }, 600);
  };

  const handleCreateProfile = () => {
    if (!newName.trim()) return;
    const newProfile: Profile = {
      id: String(Date.now()),
      name: newName,
      avatar: newName.charAt(0).toUpperCase(),
    };
    setProfiles([...profiles, newProfile]);
    setMode('select');
    setNewName('');
  };

  const handleGuestEntry = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FFE600]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Back */}
      <button
        onClick={() => mode !== 'select' ? setMode('select') : navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src={imgLogo} alt="Mercado Libre" className="h-8 object-contain opacity-70" />
        </div>
        <h1 className="text-white mb-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px' }}>
          Mercado <span style={{ color: '#FFE600' }}>Play</span>
        </h1>

        {mode === 'select' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-white/80 text-xl mb-2">¿Quién está viendo?</h2>
            <p className="text-white/40 text-sm mb-10">Selecciona tu perfil para continuar</p>

            {/* Profiles grid */}
            <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
              {profiles.map((profile, idx) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => handleSelectProfile(profile)}
                >
                  <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 border-2 ${
                    selected?.id === profile.id
                      ? 'border-[#FFE600] scale-105'
                      : 'border-transparent group-hover:border-white/40 group-hover:scale-105'
                  }`}
                    style={{ backgroundColor: AVATAR_COLORS[idx % AVATAR_COLORS.length] + '22', color: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                  >
                    <span style={{ color: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}>{profile.avatar}</span>
                    {selected?.id === profile.id && (
                      <div className="absolute inset-0 bg-[#FFE600]/20 rounded-xl flex items-center justify-center">
                        <Check size={32} className="text-[#FFE600]" />
                      </div>
                    )}
                    {profile.isKids && (
                      <span className="absolute -bottom-1 -right-1 bg-[#FFE600] text-black text-[8px] font-bold px-1 py-0.5 rounded">
                        NIÑOS
                      </span>
                    )}
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">{profile.name}</span>

                  {/* Edit button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProfile(profile);
                      setNewName(profile.name);
                      setMode('edit');
                    }}
                    className="text-white/20 hover:text-white/60 transition-colors"
                  >
                    <Edit2 size={12} />
                  </button>
                </motion.div>
              ))}

              {/* Add profile */}
              {profiles.length < 6 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: profiles.length * 0.08 }}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => setMode('create')}
                >
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-[#FFE600]/60 group-hover:bg-[#FFE600]/5 transition-all">
                    <Plus size={28} className="text-white/30 group-hover:text-[#FFE600] transition-colors" />
                  </div>
                  <span className="text-white/30 text-sm group-hover:text-white/60 transition-colors">Crear perfil</span>
                </motion.div>
              )}
            </div>

            {/* Guest option */}
            <button
              onClick={handleGuestEntry}
              className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors mx-auto"
            >
              <UserX size={16} />
              Ingresar como perfil invitado
            </button>
          </motion.div>
        )}

        {mode === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-md mx-auto"
          >
            <h2 className="text-white text-xl font-bold mb-2">Crear perfil</h2>
            <p className="text-white/40 text-sm mb-6">Ingresa el nombre del nuevo perfil</p>

            {/* Avatar preview */}
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 border-2 border-white/20"
              style={{ backgroundColor: selectedColor + '22', color: selectedColor }}
            >
              {newName.charAt(0).toUpperCase() || '?'}
            </div>

            {/* Color picker */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full transition-transform ${selectedColor === color ? 'scale-125 ring-2 ring-white/60 ring-offset-1 ring-offset-transparent' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nombre del perfil"
              className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#FFE600]/60 mb-4"
              maxLength={20}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setMode('select')}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProfile}
                disabled={!newName.trim()}
                className="flex-1 bg-[#FFE600] text-black py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Crear perfil
              </button>
            </div>
          </motion.div>
        )}

        {mode === 'edit' && editingProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-md mx-auto"
          >
            <h2 className="text-white text-xl font-bold mb-2">Modificar perfil</h2>
            <p className="text-white/40 text-sm mb-6">Edita el nombre de tu perfil</p>

            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 border-2 border-[#FFE600]/40"
              style={{ backgroundColor: '#FFE60022', color: '#FFE600' }}
            >
              {newName.charAt(0).toUpperCase() || editingProfile.avatar}
            </div>

            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nombre del perfil"
              className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#FFE600]/60 mb-4"
              maxLength={20}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setMode('select')}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!newName.trim()) return;
                  setProfiles(profiles.map(p => p.id === editingProfile.id ? { ...p, name: newName, avatar: newName.charAt(0).toUpperCase() } : p));
                  setMode('select');
                }}
                className="flex-1 bg-[#FFE600] text-black py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors"
              >
                Guardar cambios
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}