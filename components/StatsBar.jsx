import { STATS, CHAINS } from '@/lib/data'

export default function StatsBar() {
  const stats = [
    { label: 'Total Value Locked', value: STATS.tvl,      color: 'var(--cyan)' },
    { label: '24h Volume',         value: STATS.volume24, color: 'var(--purple)' },
    { label: 'Chains Supported',   value: STATS.chains,   color: 'var(--green)' },
    { label: 'Transactions',       value: STATS.txCount,  color: 'var(--orange)' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <div key={s.label} className="card p-4 fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <p className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--t3)' }}>
            {s.label}
          </p>
          <p className="text-xl font-black mono" style={{ color: s.color }}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}
