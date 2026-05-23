'use client'
import { CHAINS } from '@/lib/data'

const ROUTES = [
  { fromChain: 'ethereum', toChain: 'arbitrum',  token: 'ETH'  },
  { fromChain: 'base',     toChain: 'ethereum',  token: 'USDC' },
  { fromChain: 'polygon',  toChain: 'base',      token: 'USDC' },
  { fromChain: 'optimism', toChain: 'arbitrum',  token: 'ETH'  },
  { fromChain: 'bsc',      toChain: 'ethereum',  token: 'USDT' },
  { fromChain: 'solana',   toChain: 'base',      token: 'USDC' },
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
        {ROUTES.map((r, i) => {
          const fc = CHAINS[r.fromChain]
          const tc = CHAINS[r.toChain]
          return (
            <button
              key={i}
              onClick={() => onSelect?.(r)}
              aria-label={`Bridge ${r.token} from ${fc.name} to ${tc.name}`}
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
                  <span style={{ fontSize: 15 }}>{fc.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>{fc.name}</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ color: 'var(--t4)', flexShrink: 0 }} aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 15 }}>{tc.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>{tc.name}</span>
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
          )
        })}
      </div>
    </div>
  )
}
