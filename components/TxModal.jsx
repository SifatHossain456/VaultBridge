'use client'
import { useState, useEffect } from 'react'
import { CHAINS, TOKENS } from '@/lib/data'

const STEPS = [
  { id: 'approve',  label: 'Approve Token',          detail: 'Authorizing smart contract…' },
  { id: 'send',     label: 'Send to Bridge',          detail: 'Submitting transaction…' },
  { id: 'confirm',  label: 'Confirming Source Chain', detail: 'Waiting for confirmations…' },
  { id: 'bridge',   label: 'Bridging Cross-Chain',    detail: 'Relaying to destination…' },
  { id: 'complete', label: 'Received on Destination', detail: 'Assets delivered!' },
]

function StepIcon({ status }) {
  if (status === 'done') return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.3)' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--green)' }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  )
  if (status === 'active') return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: 'rgba(0,212,255,.1)', border: '1px solid rgba(0,212,255,.3)' }}>
      <div className="spinner" style={{ width: 14, height: 14 }} />
    </div>
  )
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
      <div className="w-2 h-2 rounded-full" style={{ background: 'var(--t4)' }} />
    </div>
  )
}

export default function TxModal({ params, onClose }) {
  const [step, setStep] = useState(0)
  const { amount, token, fromChain, toChain, fee } = params
  const fc  = CHAINS[fromChain]
  const tc  = CHAINS[toChain]
  const done = step >= STEPS.length

  useEffect(() => {
    if (done) return
    const delays = [1200, 2000, 3500, 4000]
    const id = setTimeout(() => setStep(s => s + 1), delays[step] ?? 1500)
    return () => clearTimeout(id)
  }, [step, done])

  const mockHash = '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget && done) onClose() }}>

      <div className="w-full max-w-md fade-up" style={{
        background: 'linear-gradient(160deg, #0d1825 0%, #0a1020 100%)',
        border: '1px solid var(--border-hi)', borderRadius: 24,
        boxShadow: '0 24px 64px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.04)',
      }}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2 className="font-black text-base" style={{ color: 'var(--t1)' }}>
              {done ? '🎉 Bridge Complete!' : 'Bridging in Progress'}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--t3)' }}>
              {fc.icon} {fc.name} → {tc.icon} {tc.name}
            </p>
          </div>
          {done && (
            <button onClick={onClose} className="btn-ghost text-xs">Close</button>
          )}
        </div>

        {/* Amount summary */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between p-4 rounded-2xl"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
            <div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--t3)' }}>Sending</p>
              <p className="text-2xl font-black mono" style={{ color: 'var(--t1)' }}>{amount} {token}</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--t4)' }}>
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--t3)' }}>Receiving</p>
              <p className="text-2xl font-black mono" style={{ color: done ? 'var(--green)' : 'var(--t1)' }}>
                {fee.receiveAmount} {token}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="px-6 pb-6 space-y-3">
          {STEPS.map((s, i) => {
            const status = i < step ? 'done' : i === step && !done ? 'active' : 'pending'
            return (
              <div key={s.id} className="flex items-center gap-3">
                <StepIcon status={status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{
                    color: status === 'done' ? 'var(--green)' : status === 'active' ? 'var(--t1)' : 'var(--t4)'
                  }}>{s.label}</p>
                  {status === 'active' && (
                    <p className="text-[11px]" style={{ color: 'var(--t3)' }}>{s.detail}</p>
                  )}
                  {status === 'done' && i === 1 && (
                    <p className="text-[10px] mono" style={{ color: 'var(--t3)' }}>{mockHash}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        {!done && (
          <div className="mx-6 mb-6 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-raised)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(step / STEPS.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
              }} />
          </div>
        )}

        {done && (
          <div className="px-6 pb-6">
            <button onClick={onClose} className="btn-primary">
              Bridge More Assets →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
