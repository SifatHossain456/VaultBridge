import { CHAINS, TOKENS, RECENT_TXS } from '@/lib/data'

const STATUS_STYLE = {
  completed: { bg: 'rgba(34,197,94,.08)',  dot: '#22c55e', border: 'rgba(34,197,94,.15)' },
  bridging:  { bg: 'rgba(34,211,238,.06)', dot: '#22d3ee', border: 'rgba(34,211,238,.12)' },
  failed:    { bg: 'rgba(239,68,68,.06)',  dot: '#ef4444', border: 'rgba(239,68,68,.12)' },
  pending:   { bg: 'rgba(234,179,8,.06)',  dot: '#eab308', border: 'rgba(234,179,8,.12)' },
}

export default function RecentTransactions() {
  return (
    <div className="bridge-card" style={{ padding: '20px 20px 16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--t1)', letterSpacing: '-.01em' }}>Recent Bridges</p>
        <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer' }}>
          View all
        </button>
      </div>

      {/* Tx list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {RECENT_TXS.map((tx, i) => {
          const fc    = CHAINS[tx.from]
          const tc    = CHAINS[tx.to]
          const tok   = TOKENS.find(t => t.symbol === tx.token)
          const style = STATUS_STYLE[tx.status] ?? STATUS_STYLE.pending

          return (
            <div key={tx.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', borderRadius: 14,
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                transition: 'border-color .15s',
                cursor: 'pointer',
              }}>
                {/* Token icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>{tok?.icon}</div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>
                      {tx.amount} {tx.token}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--t3)' }}>{tx.valueUsd}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: 'var(--t3)' }}>
                      {fc.icon} {fc.name}
                    </span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--t4)' }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    <span style={{ fontSize: 11, color: 'var(--t3)' }}>
                      {tc.icon} {tc.name}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--t4)' }}>· {tx.time}</span>
                  </div>
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 999,
                  background: style.bg, border: `1px solid ${style.border}`,
                  flexShrink: 0,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: style.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', color: style.dot }}>
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
