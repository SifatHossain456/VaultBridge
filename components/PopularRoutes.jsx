'use client'

const ROUTES = [
  { from: '⟠', fromName: 'Ethereum', to: '🔷', toName: 'Arbitrum',  token: 'ETH',  amount: '—'    },
  { from: '🔵', fromName: 'Base',     to: '⟠',  toName: 'Ethereum', token: 'USDC', amount: '—'    },
  { from: '🟣', fromName: 'Polygon',  to: '🔵', toName: 'Base',     token: 'USDC', amount: '—'    },
  { from: '🔴', fromName: 'Optimism', to: '🔷', toName: 'Arbitrum', token: 'ETH',  amount: '—'    },
  { from: '🟡', fromName: 'BNB',      to: '⟠',  toName: 'Ethereum', token: 'USDT', amount: '—'    },
  { from: '◎',  fromName: 'Solana',   to: '🔵', toName: 'Base',     token: 'USDC', amount: '—'    },
]

export default function PopularRoutes({ onSelect }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '18px 20px',
      width: '100%', maxWidth: 468,
    }}>
      <p style={{
        fontSize: 13, fontWeight: 700, color: 'var(--t1)',
        marginBottom: 14, letterSpacing: '-.01em',
      }}>Popular Routes</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ROUTES.map((r, i) => (
          <button
            key={i}
            onClick={() => onSelect?.(r)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: 12,
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              cursor: 'pointer', width: '100%',
              transition: 'border-color .15s, background .15s',
              textAlign: 'left',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hi)'
              e.currentTarget.style.background  = 'var(--bg-hover)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background  = 'var(--bg-panel)'
            }}
          >
            {/* Route path */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 15 }}>{r.from}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>{r.fromName}</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ color: 'var(--t4)', flexShrink: 0 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 15 }}>{r.to}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>{r.toName}</span>
              </div>
            </div>

            {/* Token badge */}
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 8px',
              borderRadius: 999, letterSpacing: '.04em',
              background: 'rgba(59,130,246,.1)',
              color: 'var(--blue)',
              border: '1px solid rgba(59,130,246,.18)',
            }}>{r.token}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
