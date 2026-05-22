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
      <button className="pill" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="text-base leading-none">{c.icon}</span>
        <span>{c.name}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown slide-down" style={{ top: 'calc(100% + 6px)', left: 0, minWidth: 200 }}>
          <p className="px-3 pt-3 pb-1.5 text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--t3)' }}>Select chain</p>
          <div className="pb-1.5 max-h-56 overflow-y-auto no-sb">
            {Object.entries(CHAINS).map(([key, ch]) => {
              const disabled = key === exclude
              return (
                <div key={key} role="option" aria-selected={key === value}
                  onClick={() => { if (!disabled) { onChange(key); setOpen(false) } }}
                  className={`dd-item ${key === value ? 'active' : ''}`}
                  style={{ opacity: disabled ? .3 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
                  <span className="text-base w-5 text-center leading-none">{ch.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold" style={{ color: 'var(--t1)' }}>{ch.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--t3)' }}>Gas ≈ {ch.gas}</p>
                  </div>
                  {key === value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--blue)', flexShrink: 0 }}>
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
