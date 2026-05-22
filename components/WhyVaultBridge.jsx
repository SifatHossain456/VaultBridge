const FEATURES = [
  {
    icon: '⚡',
    title: '~2 Second Transfers',
    desc: 'Intent-based architecture fills your order in seconds. No waiting for slow confirmations.',
    color: '#eab308',
  },
  {
    icon: '🔒',
    title: 'Non-Custodial',
    desc: 'Your keys, your assets. Fully trustless smart contracts — no wrapped tokens, no custody risk.',
    color: '#22c55e',
  },
  {
    icon: '💸',
    title: 'Lowest Fees',
    desc: '0.05% protocol fee. No hidden aggregator markup. Best liquidity routing across all paths.',
    color: '#3b82f6',
  },
  {
    icon: '🛡️',
    title: 'Battle-Tested Security',
    desc: 'Audited by Zellic & Trail of Bits. $250M+ bridged without a single exploit.',
    color: '#a78bfa',
  },
]

export default function WhyVaultBridge() {
  return (
    <section style={{ padding: '0 0 16px' }}>
      <p style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '.1em', color: 'var(--t3)', marginBottom: 16,
      }}>Why VaultBridge</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '14px 16px', borderRadius: 16,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: f.color + '14',
              border: `1px solid ${f.color}28`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{f.icon}</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 3 }}>
                {f.title}
              </p>
              <p style={{ fontSize: 12, color: 'var(--t3)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
