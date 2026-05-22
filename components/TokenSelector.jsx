'use client'
import { useState, useRef, useEffect } from 'react'
import { TOKENS, MOCK_BALANCES } from '@/lib/data'

export default function TokenSelector({ value, onChange, chain }) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const ref    = useRef(null)
  const token  = TOKENS.find(t => t.symbol === value)
  const inputRef = useRef(null)

  useEffect(() => {
    const handler = e => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open) { setSearch(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  const available = TOKENS.filter(t =>
    t.chains.includes(chain) &&
    (t.symbol.toLowerCase().includes(search.toLowerCase()) || t.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="selector-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{token?.icon ?? '?'}</span>
        <span className="text-sm font-bold" style={{ color: 'var(--t1)' }}>{value}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ color: 'var(--t3)', marginLeft: 2, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown fade-in" style={{ top: 'calc(100% + 8px)', left: 0 }} role="listbox">
          <div className="p-2">
            <input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tokens…"
              className="inp"
              style={{ fontSize: 12, padding: '8px 12px' }}
            />
          </div>
          <div className="py-1 max-h-64 overflow-y-auto no-sb">
            {available.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: 'var(--t3)' }}>No tokens on this chain</p>
            ) : available.map(t => (
              <div
                key={t.symbol}
                role="option"
                aria-selected={t.symbol === value}
                onClick={() => { onChange(t.symbol); setOpen(false) }}
                className={`dropdown-item ${t.symbol === value ? 'active' : ''}`}
              >
                <span className="text-base leading-none w-6 text-center">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--t1)' }}>{t.symbol}</p>
                  <p className="text-[10px]" style={{ color: 'var(--t3)' }}>{t.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold mono" style={{ color: 'var(--t2)' }}>{MOCK_BALANCES[t.symbol] ?? '—'}</p>
                  <p className="text-[9px]" style={{ color: 'var(--t4)' }}>${t.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
