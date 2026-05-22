'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [connected, setConnected] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{ background: 'rgba(7,11,20,.88)', borderColor: 'var(--border)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6" aria-label="Main navigation">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="VaultBridge home">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black"
            style={{ background: 'linear-gradient(135deg,#00b8d9,#0044aa)', boxShadow: '0 0 16px rgba(0,212,255,.3)' }}>
            ⬡
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-sm tracking-tight" style={{ color: 'var(--t1)' }}>VaultBridge</span>
            <span className="text-[10px] ml-2 uppercase tracking-widest" style={{ color: 'var(--t3)' }}>Cross-Chain</span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1 ml-2">
          {['Bridge', 'History', 'Pools', 'Docs'].map(item => (
            <button key={item}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ color: item === 'Bridge' ? 'var(--cyan)' : 'var(--t3)' }}
              onClick={() => {}}>
              {item}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Gas indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="text-[10px] font-bold mono" style={{ color: 'var(--t2)' }}>14 gwei</span>
          </div>

          {/* Wallet */}
          <button
            onClick={() => setConnected(c => !c)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={connected
              ? { background: 'var(--bg-raised)', color: 'var(--t1)', border: '1px solid var(--border-hi)' }
              : { background: 'linear-gradient(135deg,#00b8d9,#0066aa)', color: 'white', boxShadow: '0 4px 14px rgba(0,212,255,.2)' }
            }>
            {connected ? (
              <>
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green)' }} />
                0x4f3a...8c2d
              </>
            ) : (
              <>⬡ Connect Wallet</>
            )}
          </button>
        </div>

      </nav>
    </header>
  )
}
