import { CHAINS, TOKENS } from '@/lib/data'

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
      <span className="text-xs" style={{ color: 'var(--t3)' }}>{label}</span>
      <span className="text-xs font-bold mono" style={{ color: accent ? 'var(--cyan)' : 'var(--t1)' }}>{value}</span>
    </div>
  )
}

export default function RouteInfo({ fromChain, toChain, token, fee }) {
  if (!fee) return null
  const fc = CHAINS[fromChain]
  const tc = CHAINS[toChain]
  const tok = TOKENS.find(t => t.symbol === token)

  return (
    <div className="rounded-2xl p-4 space-y-0" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
      <Row label="Bridge Fee"    value={`${fee.feeToken} ${token} ($${fee.feeUsd})`} />
      <Row label="Source Gas"    value={fc.gas} />
      <Row label="Dest Gas"      value={tc.gas} />
      <Row label="Est. Time"     value={fee.time} accent />
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs" style={{ color: 'var(--t3)' }}>Route</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs" style={{ color: 'var(--t2)' }}>{fc.icon} {fc.name}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--t4)' }}>
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,212,255,.1)', color: 'var(--cyan)', border: '1px solid rgba(0,212,255,.2)' }}>
            VaultBridge
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--t4)' }}>
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span className="text-xs" style={{ color: 'var(--t2)' }}>{tc.icon} {tc.name}</span>
        </div>
      </div>
    </div>
  )
}
