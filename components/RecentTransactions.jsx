import { CHAINS, TOKENS, RECENT_TXS } from '@/lib/data'

export default function RecentTransactions() {
  return (
    <div className="bridge-card p-5" style={{ maxWidth: 468, width: '100%' }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-bold" style={{ color: 'var(--t1)' }}>Recent Bridges</p>
        <button className="text-[11px] font-semibold" style={{ color: 'var(--blue)' }}>View all</button>
      </div>

      <div className="space-y-1.5">
        {RECENT_TXS.map((tx, i) => {
          const fc  = CHAINS[tx.from]
          const tc  = CHAINS[tx.to]
          const tok = TOKENS.find(t => t.symbol === tx.token)
          return (
            <div key={tx.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
              style={{ background: 'var(--bg-panel)' }}>
              <span className="text-xl leading-none shrink-0">{tok?.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[13px] font-semibold" style={{ color: 'var(--t1)' }}>
                    {tx.amount} {tx.token}
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--t3)' }}>{tx.valueUsd}</span>
                </div>
                <p className="text-[11px] flex items-center gap-1" style={{ color: 'var(--t3)' }}>
                  {fc.icon} {fc.name}
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  {tc.icon} {tc.name}
                  <span style={{ color: 'var(--t4)' }}>· {tx.time}</span>
                </p>
              </div>
              <span className={`badge badge-${tx.status}`}>{tx.status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
