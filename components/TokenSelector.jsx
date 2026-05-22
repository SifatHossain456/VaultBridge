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
        <span style={{ fontSize: 16, lineHeight: 1 }}>{tok?.icon ?? '?'}</span>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{value}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`pill-caret${open ? ' open' : ''}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown slide-down" style={{ top: 'calc(100% + 6px)', left: 0, minWidth: 248 }}>
          <div style={{ padding: '10px 10px 6px' }}>
            <input ref={inputRef} value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search token…" className="dd-search" />
          </div>

          <div className="no-sb" style={{ maxHeight: 280, overflowY: 'auto', paddingBottom: 6 }}>
            {list.length === 0
              ? <p style={{ padding: '20px 14px', fontSize: 12, color: 'var(--t3)', textAlign: 'center' }}>
                  No tokens on this chain
                </p>
              : list.map(t => (
                <div key={t.symbol} role="option" aria-selected={t.symbol === value}
                  onClick={() => { onChange(t.symbol); setOpen(false) }}
                  className={`dd-item ${t.symbol === value ? 'active' : ''}`}>
                  <span style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17, flexShrink: 0,
                  }}>{t.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: 'var(--t1)', fontSize: 13 }}>{t.symbol}</p>
                    <p style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>{t.name}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--t2)' }}>
                      {MOCK_BALANCES[t.symbol] ?? '—'}
                    </p>
                    <p style={{ fontSize: 10, color: 'var(--t4)', marginTop: 1 }}>
                      ${t.price.toLocaleString()}
                    </p>
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
