'use client'
import { useState, useRef, useEffect } from 'react'
import { CHAINS } from '@/lib/data'

export default function ChainSelector({ value, onChange, exclude }) {
  const [open, setOpen] = useState(false)
  const ref  = useRef(null)
  const chain = CHAINS[value]

  useEffect(() => {
    const handler = e => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="selector-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-lg leading-none">{chain.icon}</span>
        <span className="text-sm font-bold" style={{ color: 'var(--t1)' }}>{chain.name}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ color: 'var(--t3)', marginLeft: 2, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown fade-in" style={{ top: 'calc(100% + 8px)', left: 0 }} role="listbox">
          <div className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] uppercase tracking-widest font-bold px-2" style={{ color: 'var(--t3)' }}>Select Chain</p>
          </div>
          <div className="py-1 max-h-60 overflow-y-auto no-sb">
            {Object.entries(CHAINS).map(([key, c]) => {
              const isDisabled = key === exclude
              return (
                <div
                  key={key}
                  role="option"
                  aria-selected={key === value}
                  onClick={() => { if (!isDisabled) { onChange(key); setOpen(false) } }}
                  className={`dropdown-item ${key === value ? 'active' : ''} ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <span className="text-base leading-none w-6 text-center">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>{c.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--t3)' }}>Gas ≈ {c.gas}</p>
                  </div>
                  {key === value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--cyan)', flexShrink: 0 }}>
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
