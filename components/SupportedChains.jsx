import { CHAINS } from '@/lib/data'

export default function SupportedChains() {
  const chains = Object.values(CHAINS)

  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 20px',
      textAlign: 'center',
    }}>
      <p style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '.1em', color: 'var(--t3)', marginBottom: 24,
      }}>Supported Networks</p>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap', gap: 12, maxWidth: 600, margin: '0 auto',
      }}>
        {chains.map(c => (
          <div key={c.name} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 999,
            background: 'var(--bg-card)',
            border: `1px solid ${c.color}28`,
            transition: 'border-color .2s, background .2s',
          }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: c.color + '1a',
              border: `1px solid ${c.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, flexShrink: 0,
            }}>{c.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t2)' }}>{c.name}</span>
          </div>
        ))}

        {/* Coming soon */}
        {['zkSync', 'Scroll', 'Linea', 'Mode'].map(name => (
          <div key={name} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 999,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            opacity: 0.45,
          }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: 'var(--t4)', fontWeight: 700,
            }}>?</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t4)' }}>{name}</span>
            <span style={{
              fontSize: 9, fontWeight: 700, color: 'var(--t4)',
              textTransform: 'uppercase', letterSpacing: '.06em',
            }}>Soon</span>
          </div>
        ))}
      </div>
    </section>
  )
}
