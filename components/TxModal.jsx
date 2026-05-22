'use client'
import { useState, useEffect } from 'react'
import { CHAINS } from '@/lib/data'

const STEPS = [
  { label: 'Approve token',           sub: 'Authorizing contract spend…'     },
  { label: 'Submit to bridge',        sub: 'Sending transaction…'             },
  { label: 'Confirming on source',    sub: 'Waiting for block confirmations…' },
  { label: 'Relaying cross-chain',    sub: 'Bridging to destination…'         },
  { label: 'Delivered',               sub: 'Funds arrived!'                   },
]
const DELAYS = [1000, 2200, 3800, 4500]

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export default function TxModal({ params, onClose }) {
  const [step, setStep] = useState(0)
  const { amount, token, fromChain, toChain, fee } = params
  const fc   = CHAINS[fromChain]
  const tc   = CHAINS[toChain]
  const done = step >= STEPS.length

  useEffect(() => {
    if (done) return
    const id = setTimeout(() => setStep(s => s + 1), DELAYS[step] ?? 1500)
    return () => clearTimeout(id)
  }, [step, done])

  const mockHash = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '…'

  return (
    <div className="backdrop fade-in" onClick={e => { if (e.target === e.currentTarget && done) onClose() }}>
      <div className="bridge-card fade-up" style={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="font-bold text-[15px]" style={{ color: 'var(--t1)' }}>
              {done ? 'Bridge complete' : 'Bridging…'}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--t3)' }}>
              {fc.icon} {fc.name} → {tc.icon} {tc.name}
            </p>
          </div>
          {done && (
            <button onClick={onClose} className="btn-ghost">Close</button>
          )}
        </div>

        {/* Amount row */}
        <div className="mx-5 mt-4 p-3 rounded-2xl flex items-center justify-between"
          style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-[10px] font-semibold mb-0.5" style={{ color: 'var(--t3)' }}>SENDING</p>
            <p className="text-xl font-black mono" style={{ color: 'var(--t1)' }}>{amount} {token}</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--t4)' }}>
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          <div className="text-right">
            <p className="text-[10px] font-semibold mb-0.5" style={{ color: 'var(--t3)' }}>RECEIVING</p>
            <p className="text-xl font-black mono" style={{ color: done ? 'var(--green)' : 'var(--t1)' }}>
              {fee.receiveAmount} {token}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="px-5 py-4 space-y-3">
          {STEPS.map((s, i) => {
            const isDone   = i < step
            const isActive = i === step && !done

            return (
              <div key={i} className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: isDone   ? 'rgba(34,197,94,.12)'  :
                                isActive ? 'rgba(59,130,246,.12)'  : 'var(--bg-panel)',
                    border: `1px solid ${isDone ? 'rgba(34,197,94,.25)' : isActive ? 'rgba(59,130,246,.3)' : 'var(--border)'}`,
                  }}>
                  {isDone   && <span style={{ color: 'var(--green)' }}><CheckIcon /></span>}
                  {isActive && <div className="spinner" style={{ width: 13, height: 13 }} />}
                  {!isDone && !isActive && <div className="w-2 h-2 rounded-full" style={{ background: 'var(--t4)' }} />}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{
                    color: isDone ? 'var(--green)' : isActive ? 'var(--t1)' : 'var(--t4)'
                  }}>{s.label}</p>
                  {isActive && <p className="text-[11px]" style={{ color: 'var(--t3)' }}>{s.sub}</p>}
                  {isDone && i === 1 && <p className="text-[10px] mono" style={{ color: 'var(--t4)' }}>{mockHash}</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        {!done && (
          <div className="mx-5 mb-5 h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(step / STEPS.length) * 100}%`, background: 'var(--blue)' }} />
          </div>
        )}

        {done && (
          <div className="px-5 pb-5">
            <button onClick={onClose} className="btn-bridge">Bridge again</button>
          </div>
        )}

      </div>
    </div>
  )
}
