import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Users, UserCheck, Check, Send, Star, ChevronRight } from 'lucide-react';
import { getContentById } from '../data/content';
import { Navbar } from '../components/Navbar';

const FRIENDS = [
  { id: '1', name: 'Ana García', avatar: 'A', color: '#10B981', mutual: 3 },
  { id: '2', name: 'Luis Moreno', avatar: 'L', color: '#4F46E5', mutual: 7 },
  { id: '3', name: 'Paula Soto', avatar: 'P', color: '#F59E0B', mutual: 2 },
  { id: '4', name: 'Jorge Pérez', avatar: 'J', color: '#EF4444', mutual: 5 },
  { id: '5', name: 'Carla Vega', avatar: 'C', color: '#8B5CF6', mutual: 1 },
  { id: '6', name: 'Tomás Díaz', avatar: 'T', color: '#06B6D4', mutual: 4 },
  { id: '7', name: 'María López', avatar: 'M', color: '#EC4899', mutual: 6 },
];

const GROUPS = [
  { id: 'g1', name: 'Familia García', members: 5, avatar: 'FG' },
  { id: 'g2', name: 'Amigos del trabajo', members: 8, avatar: 'AT' },
  { id: 'g3', name: 'Cinéfilos', members: 12, avatar: 'CI' },
];

export function RecommendPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const content = getContentById(id || '');
  const [mode, setMode] = useState<'choose' | 'group' | 'friend' | 'done'>('choose');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((f) => f !== friendId) : [...prev, friendId]
    );
  };

  const handleSend = () => {
    setMode('done');
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <p className="text-white">Contenido no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />
      <div className="h-[116px]" />

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(`/contenido/${content.id}`)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft size={14} /> Volver
        </button>

        {/* Content preview */}
        <div className="flex items-start gap-4 mb-8 bg-white/5 rounded-xl p-4 border border-white/8">
          <img
            src={content.image}
            alt={content.title}
            className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
          />
          <div>
            <p className="text-white/40 text-xs mb-1">{content.type} · {content.genre}</p>
            <h3 className="text-white font-bold mb-1">{content.title}</h3>
            <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{content.description}</p>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className={s <= content.rating ? 'text-[#FFE600] fill-[#FFE600]' : 'text-white/20'} />
              ))}
              <span className="text-white/40 text-xs ml-1">{content.rating}</span>
            </div>
          </div>
        </div>

        <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {mode === 'choose' && (
            <div>
              <h1 className="text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px' }}>
                Recomendar contenido
              </h1>
              <p className="text-white/50 text-sm mb-8">¿A quién quieres recomendarle este contenido?</p>

              <div className="space-y-4">
                <button
                  onClick={() => setMode('group')}
                  className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl p-5 text-left transition-all group"
                >
                  <div className="w-12 h-12 bg-[#FFE600]/10 rounded-xl flex items-center justify-center border border-[#FFE600]/20 group-hover:bg-[#FFE600]/20 transition-colors">
                    <Users size={22} className="text-[#FFE600]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">Recomendar al grupo</p>
                    <p className="text-white/40 text-sm">Comparte con todos los miembros de un grupo de tu comunidad</p>
                  </div>
                  <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
                </button>

                <button
                  onClick={() => setMode('friend')}
                  className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl p-5 text-left transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                    <UserCheck size={22} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">Elegir amigo o familiar</p>
                    <p className="text-white/40 text-sm">Selecciona contactos específicos de tu red</p>
                  </div>
                  <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
                </button>
              </div>
            </div>
          )}

          {mode === 'group' && (
            <div>
              <h2 className="text-white mb-2 font-bold text-2xl">Elegir grupo</h2>
              <p className="text-white/50 text-sm mb-6">Selecciona el grupo al que quieres compartir la recomendación</p>

              <div className="space-y-3 mb-6">
                {GROUPS.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
                    className={`w-full flex items-center gap-4 rounded-xl p-4 text-left transition-all border ${
                      selectedGroup === group.id
                        ? 'bg-[#FFE600]/10 border-[#FFE600]/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/8'
                    }`}
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {group.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{group.name}</p>
                      <p className="text-white/40 text-xs">{group.members} miembros</p>
                    </div>
                    {selectedGroup === group.id && (
                      <Check size={18} className="text-[#FFE600]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="text-white/50 text-xs mb-2 block">Mensaje (opcional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿Por qué la recomiendas?"
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#FFE600]/40 resize-none transition-colors"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!selectedGroup}
                className="w-full flex items-center justify-center gap-2 bg-[#FFE600] text-black py-3.5 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} /> Enviar recomendación
              </button>
            </div>
          )}

          {mode === 'friend' && (
            <div>
              <h2 className="text-white mb-2 font-bold text-2xl">Elegir contactos</h2>
              <p className="text-white/50 text-sm mb-6">
                Selecciona las personas a quienes quieres recomendar este contenido
              </p>

              {/* My rating */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/8 mb-5">
                <p className="text-white/50 text-xs mb-2">Tu calificación para compartir</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)}>
                      <Star size={22} className={s <= rating ? 'text-[#FFE600] fill-[#FFE600]' : 'text-white/20'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-5 max-h-72 overflow-y-auto">
                {FRIENDS.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => toggleFriend(friend.id)}
                    className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all border ${
                      selectedFriends.includes(friend.id)
                        ? 'bg-[#FFE600]/10 border-[#FFE600]/40'
                        : 'bg-white/5 border-white/8 hover:bg-white/8'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: friend.color + '30', color: friend.color, border: `1.5px solid ${friend.color}50` }}
                    >
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{friend.name}</p>
                      <p className="text-white/30 text-xs">{friend.mutual} amigos en común</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedFriends.includes(friend.id) ? 'bg-[#FFE600] border-[#FFE600]' : 'border-white/20'
                    }`}>
                      {selectedFriends.includes(friend.id) && <Check size={12} className="text-black" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="text-white/50 text-xs mb-2 block">Mensaje (opcional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿Por qué la recomiendas?"
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#FFE600]/40 resize-none transition-colors"
                  rows={2}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={selectedFriends.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-[#FFE600] text-black py-3.5 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                Enviar a {selectedFriends.length > 0 ? `${selectedFriends.length} persona${selectedFriends.length > 1 ? 's' : ''}` : 'contactos'}
              </button>
            </div>
          )}

          {mode === 'done' && (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                className="w-20 h-20 bg-[#FFE600]/10 border-2 border-[#FFE600] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check size={36} className="text-[#FFE600]" />
              </motion.div>
              <h2 className="text-white mb-2 font-bold text-2xl">¡Recomendación enviada!</h2>
              <p className="text-white/50 text-sm mb-8">
                Tu recomendación de <span className="text-white font-medium">{content.title}</span> fue compartida exitosamente.
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button
                  onClick={() => navigate(`/contenido/${content.id}`)}
                  className="w-full bg-[#FFE600] text-black py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors"
                >
                  Volver al contenido
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="w-full bg-white/5 text-white/70 py-3 rounded-lg text-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Ir al inicio
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}