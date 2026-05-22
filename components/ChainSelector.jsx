'use client'
import { useState, useRef, useEffect } from 'react'
import { CHAINS } from '@/lib/data'

export default function ChainSelector({ value, onChange, exclude }) {
  const [open, setOpen] = useState(false)
  const ref  = useRef(null)
  const c    = CHAINS[value]

  useEffect(() => {
    if (!open) return
    const fn = e => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        className="pill"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{
          width: 22, height: 22, borderRadius: '50%',
          background: c.color + '22',
          border: `1px solid ${c.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, flexShrink: 0,
        }}>{c.icon}</span>
        <span style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`pill-caret${open ? ' open' : ''}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown slide-down" style={{ top: 'calc(100% + 6px)', left: 0, minWidth: 210 }}>
          <p style={{ padding: '12px 14px 8px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--t3)' }}>
            Select network
          </p>
          <div className="no-sb" style={{ maxHeight: 260, overflowY: 'auto', paddingBottom: 6 }}>
            {Object.entries(CHAINS).map(([key, ch]) => {
              const disabled = key === exclude
              return (
                <div key={key} role="option" aria-selected={key === value}
                  onClick={() => { if (!disabled) { onChange(key); setOpen(false) } }}
                  className={`dd-item ${key === value ? 'active' : ''}`}
                  style={{ opacity: disabled ? .3 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: ch.color + '1a', border: `1px solid ${ch.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                  }}>{ch.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: 'var(--t1)', fontSize: 13 }}>{ch.name}</p>
                    <p style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>Gas ≈ {ch.gas}</p>
                  </div>
                  {key === value && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--blue)', flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
