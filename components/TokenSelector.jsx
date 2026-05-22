'use client'
import { useState, useRef, useEffect } from 'react'
import { TOKENS, MOCK_BALANCES } from '@/lib/data'

export default function TokenSelector({ value, onChange, chain }) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const ref      = useRef(null)
  const inputRef = useRef(null)
  const tok      = TOKENS.find(t => t.symbol === value)

  useEffect(() => {
    if (!open) return
    const fn = e => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  useEffect(() => {
    if (open) { setSearch(''); setTimeout(() => inputRef.current?.focus(), 40) }
  }, [open])

  const list = TOKENS.filter(t =>
    t.chains.includes(chain) &&
    (t.symbol.toLowerCase().includes(search.toLowerCase()) ||
     t.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="relative" ref={ref}>
      <button className="pill" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="text-sm leading-none">{tok?.icon ?? '?'}</span>
        <span>{value}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown slide-down" style={{ top: 'calc(100% + 6px)', left: 0, minWidth: 230 }}>
          <div className="p-2">
            <input ref={inputRef} value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search token…"
              style={{
                width: '100%', padding: '7px 11px', borderRadius: 9,
                background: 'var(--bg-input)', border: '1px solid var(--border)',
                color: 'var(--t1)', fontSize: 12, outline: 'none',
              }} />
          </div>
          <div className="pb-1.5 max-h-60 overflow-y-auto no-sb">
            {list.length === 0
              ? <p className="px-3 py-4 text-xs text-center" style={{ color: 'var(--t3)' }}>No tokens on this chain</p>
              : list.map(t => (
                <div key={t.symbol} role="option" aria-selected={t.symbol === value}
                  onClick={() => { onChange(t.symbol); setOpen(false) }}
                  className={`dd-item ${t.symbol === value ? 'active' : ''}`}>
                  <span className="text-base leading-none w-5 text-center">{t.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold" style={{ color: 'var(--t1)' }}>{t.symbol}</p>
                    <p className="text-[10px]" style={{ color: 'var(--t3)' }}>{t.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] mono font-medium" style={{ color: 'var(--t2)' }}>{MOCK_BALANCES[t.symbol] ?? '—'}</p>
                    <p className="text-[10px]" style={{ color: 'var(--t4)' }}>${t.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}
