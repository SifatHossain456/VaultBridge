const STATS = [
  { value: '$4.82B', label: 'Total Volume',     color: '#3b82f6' },
  { value: '2.4M+',  label: 'Transactions',     color: '#22d3ee' },
  { value: '~2min',  label: 'Avg Bridge Time',  color: '#22c55e' },
  { value: '8',      label: 'Chains Supported', color: '#a78bfa' },
]

export default function StatsBar() {
  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-card)',
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0, flexWrap: 'wrap',
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: 0,
          }}>
            <div style={{
              padding: '14px 32px', textAlign: 'center',
            }}>
              <p className="mono" style={{
                fontSize: 22, fontWeight: 800, color: s.color,
                letterSpacing: '-0.03em', lineHeight: 1,
              }}>{s.value}</p>
              <p style={{
                fontSize: 10, color: 'var(--t3)', marginTop: 4,
                textTransform: 'uppercase', letterSpacing: '.07em', fontWeight: 600,
              }}>{s.label}</p>
            </div>
            {i < STATS.length - 1 && (
              <div style={{ width: 1, height: 32, background: 'var(--border)', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
