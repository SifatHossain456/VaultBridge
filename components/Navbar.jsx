'use client'
import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = ['Bridge', 'History', 'Pools', 'Docs']

export default function Navbar() {
  const [connected, setConnected] = useState(false)

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

          {/* Gas */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
            <span className="gas-dot" style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--green)', display: 'inline-block', flexShrink: 0,
            }} />
            <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>14 gwei</span>
          </div>

          {/* Network pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13 }}>⟠</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>Ethereum</span>
          </div>

          {/* Wallet button */}
          <button onClick={() => setConnected(c => !c)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all .2s',
              ...(connected
                ? { background: 'var(--bg-panel)', color: 'var(--t1)', border: '1px solid var(--border)' }
                : {
                    background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
                    color: '#fff', border: '1px solid transparent',
                    boxShadow: '0 4px 14px rgba(59,130,246,.35)',
                  }
              ),
            }}>
            {connected ? (
              <>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                0x4f3a…8c2d
              </>
            ) : 'Connect Wallet'}
          </button>
        </div>

      </nav>
    </header>
  )
}
