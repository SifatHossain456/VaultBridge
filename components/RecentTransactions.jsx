import { CHAINS, TOKENS, RECENT_TXS } from '@/lib/data'

function StatusDot({ status }) {
  const colors = { completed: 'var(--green)', bridging: 'var(--cyan)', failed: 'var(--red)', pending: 'var(--yellow)' }
  return (
    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors[status] ?? 'var(--t4)' }} />
  )
}

export default function RecentTransactions() {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold" style={{ color: 'var(--t1)' }}>Recent Bridges</h2>
        <button className="text-[10px] font-semibold" style={{ color: 'var(--cyan)' }}>View all →</button>
      </div>

      <div className="space-y-2">
        {RECENT_TXS.map((tx, i) => {
          const fc  = CHAINS[tx.from]
          const tc  = CHAINS[tx.to]
          const tok = TOKENS.find(t => t.symbol === tx.token)
          return (
            <div key={tx.id} className="slide-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                <div className="relative shrink-0">
                  <span className="text-xl leading-none">{tok?.icon ?? '?'}</span>
                  <span className="absolute -bottom-1 -right-1 text-[9px] leading-none">{fc.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold" style={{ color: 'var(--t1)' }}>
                      {tx.amount} {tx.token}
                    </p>
                    <span className="text-[9px]" style={{ color: 'var(--t4)' }}>·</span>
                    <p className="text-[10px]" style={{ color: 'var(--t3)' }}>{tx.valueUsd}</p>
                  </div>
                  <p className="text-[10px] flex items-center gap-1" style={{ color: 'var(--t3)' }}>
                    {fc.name}
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    {tc.name}
                    <span style={{ color: 'var(--t4)' }}>· {tx.time}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <StatusDot status={tx.status} />
                  <span className={`badge badge-${tx.status}`}>{tx.status}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
