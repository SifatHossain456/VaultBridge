import BridgeWidget       from '@/components/BridgeWidget'
import RecentTransactions from '@/components/RecentTransactions'
import StatsBar           from '@/components/StatsBar'
import { CHAINS }         from '@/lib/data'

export default function HomePage() {
  const chains = Object.values(CHAINS)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-up">

      {/* Hero */}
      <section className="text-center space-y-4 py-2" aria-label="Hero">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(0,212,255,.08)', color: 'var(--cyan)', border: '1px solid rgba(0,212,255,.2)' }}>
          ⬡ Cross-Chain Bridge Protocol
        </div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight" style={{ color: 'var(--t1)' }}>
          Bridge at the{' '}
          <span style={{ background: 'linear-gradient(90deg,#00d4ff,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Speed of Light
          </span>
        </h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--t2)' }}>
          Transfer assets across {Object.keys(CHAINS).length} chains in minutes. Best rates, lowest fees, fully decentralized.
        </p>

        {/* Chain icons */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
          {chains.map(c => (
            <span key={c.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{
                background: `${c.color}12`,
                color: c.color,
                border: `1px solid ${c.color}30`,
              }}>
              {c.icon} {c.name}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Bridge widget */}
        <div className="lg:col-span-3">
          <BridgeWidget />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          <RecentTransactions />

          {/* Info card */}
          <div className="card p-5 space-y-4">
            <h3 className="text-sm font-bold" style={{ color: 'var(--t1)' }}>Why VaultBridge?</h3>
            {[
              { icon: '⚡', title: '~2 Min Transfers',    desc: 'Fastest cross-chain bridge using optimistic relayers' },
              { icon: '🔒', title: 'Non-Custodial',       desc: 'Your keys, your assets — fully trustless smart contracts' },
              { icon: '💸', title: 'Lowest Fees',         desc: '0.05% bridge fee, no hidden costs, best liquidity routing' },
              { icon: '🌐', title: '8 Chains Supported',  desc: 'ETH, ARB, BASE, OP, POL, BSC, AVAX, SOL and growing' },
            ].map(item => (
              <div key={item.title} className="flex gap-3">
                <span className="text-xl leading-none shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--t1)' }}>{item.title}</p>
                  <p className="text-[11px]" style={{ color: 'var(--t3)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
