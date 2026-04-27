import type { Content } from '../data/content'
import ContentCard from './ContentCard'

interface RowProps {
  label: string
  items: Content[]
  variant?: 'standard' | 'landscape' | 'top10' | 'para-vos'
  highlight?: boolean
}

export function ContentRow({ label, items, variant = 'standard', highlight = false }: RowProps) {
  return (
    <section className={`px-6 mb-8 ${highlight ? 'border-l-2 border-[#FFE600] pl-5' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-[14px] font-black text-white">{label}</h2>
        {highlight && (
          <span className="bg-[#FFE600] text-black text-[8px] font-black uppercase tracking-[0.8px] px-1.5 py-0.5 rounded-[2px]">NUEVO</span>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {items.map((c, i) => (
          <ContentCard key={c.id} content={c} variant={variant} rank={i + 1} />
        ))}
      </div>
    </section>
  )
}
