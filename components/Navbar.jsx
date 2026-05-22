'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [connected, setConnected] = useState(false)

  return (
    <header className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
            style={{ background: 'var(--blue)', fontWeight: 900, color: '#fff' }}>V</div>
          <span className="font-bold text-sm" style={{ color: 'var(--t1)' }}>VaultBridge</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 ml-1">
          {['Bridge', 'History', 'Pools', 'Docs'].map(item => (
            <button key={item} className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              style={{ color: item === 'Bridge' ? 'var(--t1)' : 'var(--t3)' }}>
              {item}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
            style={{ border: '1px solid var(--border)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="text-[11px] mono font-medium" style={{ color: 'var(--t2)' }}>14 gwei</span>
          </div>

          <button onClick={() => setConnected(c => !c)}
            className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all"
            style={connected
              ? { border: '1px solid var(--border)', color: 'var(--t1)', background: 'var(--bg-panel)' }
              : { background: 'var(--blue)', color: '#fff', border: '1px solid transparent' }
            }>
            {connected ? '0x4f3a…8c2d' : 'Connect Wallet'}
          </button>
        </div>

      </nav>
    </header>
  )
}
