import BridgeWidget       from '@/components/BridgeWidget'
import RecentTransactions from '@/components/RecentTransactions'
import PopularRoutes      from '@/components/PopularRoutes'
import WhyVaultBridge     from '@/components/WhyVaultBridge'
import SupportedChains    from '@/components/SupportedChains'
import StatsBar           from '@/components/StatsBar'

export default function HomePage() {
  return (
    <div className="page-wrapper">

      {/* Stats bar — Across-style credibility strip */}
      <StatsBar />

      {/* Main section */}
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: '40px 20px 0',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 24,
        alignItems: 'start',
      }}>

        {/* Desktop: 3-column, Mobile: 1-column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          alignItems: 'start',
        }}>
          {/* Left col: Bridge widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BridgeWidget />
            <RecentTransactions />
          </div>

          {/* Right col: Popular routes + Why VaultBridge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PopularRoutes />
            <WhyVaultBridge />
          </div>
        </div>

      </div>

      {/* Supported chains strip */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 20px' }}>
        <SupportedChains />
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px 20px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, color: 'var(--t4)' }}>
          VaultBridge · Not financial advice · Always verify addresses before bridging
        </p>
      </footer>

    </div>
  )
}
