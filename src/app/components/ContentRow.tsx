import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Content } from '../data/content';
import { ContentCard } from './ContentCard';

interface ContentRowProps {
  title: string;
  contents: Content[];
  cardSize?: 'sm' | 'md' | 'lg';
  horizontal?: boolean;
}

export function ContentRow({ title, contents, cardSize = 'md', horizontal = false }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = horizontal ? 520 : 220;
    rowRef.current.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative group/row">
      <h2 className="text-white mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '22px' }}>
        {title}
      </h2>
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black border border-white/20 shadow-xl"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scroll container */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              size={cardSize}
              horizontal={horizontal}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black border border-white/20 shadow-xl"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
