import { useNavigate } from 'react-router';
import { Play, Info } from 'lucide-react';
import type { Content } from '../data/content';

interface ContentCardProps {
  content: Content;
  size?: 'sm' | 'md' | 'lg';
  horizontal?: boolean;
}

export function ContentCard({ content, size = 'md', horizontal = false }: ContentCardProps) {
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'w-[160px] h-[240px]',
    md: 'w-[200px] h-[300px]',
    lg: 'w-[260px] h-[380px]',
  };

  if (horizontal) {
    return (
      <div
        className="relative flex-shrink-0 w-[480px] h-[270px] rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => navigate(`/contenido/${content.id}`)}
      >
        <img
          src={content.image}
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        {content.isNew && (
          <span className="absolute top-0 left-0 bg-[#FFE600] text-black text-[10px] font-bold px-2 py-1 rounded-br-lg">
            NUEVO
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-white/60 text-xs mb-1">{content.type} · {content.genre}</div>
          <h3 className="text-white font-bold text-lg leading-tight">{content.title}</h3>
          <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/reproducir/${content.id}`); }}
              className="flex items-center gap-1.5 bg-[#FFE600] text-black px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-300 transition-colors"
            >
              <Play size={12} fill="black" /> Ver
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/contenido/${content.id}`); }}
              className="flex items-center gap-1.5 bg-white/20 text-white px-3 py-1.5 rounded text-xs font-semibold border border-white/30 hover:bg-white/30 transition-colors"
            >
              <Info size={12} /> Info
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex-shrink-0 ${sizeClasses[size]} rounded-lg overflow-hidden cursor-pointer group`}
      onClick={() => navigate(`/contenido/${content.id}`)}
    >
      <img
        src={content.image}
        alt={content.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      {content.isNew && (
        <span className="absolute top-0 left-0 bg-[#FFE600] text-black text-[10px] font-bold px-2 py-1 rounded-br-lg">
          NUEVO
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="text-white/60 text-[10px] mb-0.5">{content.type} · {content.genre}</div>
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">{content.title}</h3>
        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/reproducir/${content.id}`); }}
            className="flex items-center justify-center bg-[#FFE600] text-black rounded-full w-7 h-7 hover:bg-yellow-300 transition-colors"
          >
            <Play size={12} fill="black" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/contenido/${content.id}`); }}
            className="flex items-center justify-center bg-white/20 text-white rounded-full w-7 h-7 border border-white/30 hover:bg-white/30 transition-colors"
          >
            <Info size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
