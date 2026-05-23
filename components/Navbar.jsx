'use client'
import Link from 'next/link'
import { useWallet } from '@/lib/WalletContext'
import { useGasPrice } from '@/hooks/useGasPrice'

const NAV_LINKS = ['Bridge', 'History', 'Pools', 'Docs']

export default function Navbar() {
  const { address, shortAddress, chainName, connecting, connect, disconnect } = useWallet()
  const gwei = useGasPrice()

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'rgba(8,9,14,.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
      <nav className="max-w-6xl mx-auto px-5 h-[58px] flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59,130,246,.4)',
            fontSize: 14, fontWeight: 900, color: '#fff',
          }}>V</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--t1)', letterSpacing: '-.02em' }}>
            VaultBridge
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center ml-2">
          {NAV_LINKS.map(item => (
            <button key={item}
              style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 13,
                fontWeight: item === 'Bridge' ? 600 : 500,
                color: item === 'Bridge' ? 'var(--t1)' : 'var(--t3)',
                background: item === 'Bridge' ? 'var(--bg-panel)' : 'transparent',
                border: item === 'Bridge' ? '1px solid var(--border)' : '1px solid transparent',
                cursor: 'pointer', transition: 'color .15s',
              }}>
              {item}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-2.5">

          {/* Live gas */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0, display: 'inline-block',
              background: gwei === '—' ? 'var(--t4)' : 'var(--green)',
            }} />
            <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>
              {gwei} gwei
            </span>
          </div>

          {/* Chain pill — only when connected */}
          {address && chainName && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13 }}>⟠</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>{chainName}</span>
            </div>
          )}

          {/* Wallet button */}
          <button
            onClick={address ? disconnect : connect}
            disabled={connecting}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              cursor: connecting ? 'default' : 'pointer', transition: 'all .2s',
              opacity: connecting ? 0.7 : 1,
              ...(address
                ? { background: 'var(--bg-panel)', color: 'var(--t1)', border: '1px solid var(--border)' }
                : {
                    background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
                    color: '#fff', border: '1px solid transparent',
                    boxShadow: '0 4px 14px rgba(59,130,246,.35)',
                  }
              ),
            }}>
            {connecting ? 'Connecting…' : address ? (
              <>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                {shortAddress}
              </>
            ) : 'Connect Wallet'}
          </button>
        </div>

      </nav>
    </header>
  )
}
