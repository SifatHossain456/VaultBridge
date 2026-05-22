import BridgeWidget       from '@/components/BridgeWidget'
import RecentTransactions from '@/components/RecentTransactions'
import { STATS, CHAINS }  from '@/lib/data'

export default function HomePage() {
  return (
    <div className="page-wrapper" style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '36px 16px 48px', gap: 16 }}>

      <BridgeWidget />
      <RecentTransactions />

      {/* Bottom stats — quiet, unobtrusive */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 8 }}>
        {[
          { label: 'TVL',    value: STATS.tvl      },
          { label: 'Vol',    value: STATS.volume24 },
          { label: 'Chains', value: STATS.chains   },
          { label: 'Txns',   value: STATS.txCount  },
        ].map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--t4)' }}>
              {s.label}
            </span>
            <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--t3)' }}>
              {s.value}
            </span>
            {i < 3 && <span style={{ fontSize: 10, color: 'var(--border-hi)', marginLeft: 6 }}>·</span>}
          </div>
        ))}
      </div>

    </div>
  )
}
