import BridgeWidget       from '@/components/BridgeWidget'
import RecentTransactions from '@/components/RecentTransactions'
import { STATS }          from '@/lib/data'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-start px-4 py-10 gap-5 fade-up">

      {/* Bridge widget — the single focus */}
      <BridgeWidget />

      {/* Recent txs — directly below, same width */}
      <RecentTransactions />

      {/* Footer stats — minimal, unobtrusive */}
      <div className="flex items-center gap-6 pt-2">
        {[
          { label: 'TVL',     value: STATS.tvl      },
          { label: 'Volume',  value: STATS.volume24 },
          { label: 'Chains',  value: STATS.chains   },
          { label: 'Txns',    value: STATS.txCount  },
        ].map(s => (
          <div key={s.label} className="text-center">
            <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--t4)' }}>{s.label}</p>
            <p className="text-sm font-bold mono" style={{ color: 'var(--t2)' }}>{s.value}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
