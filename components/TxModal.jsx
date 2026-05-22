'use client'
import { useState, useEffect } from 'react'
import { CHAINS } from '@/lib/data'

const STEPS = [
  { label: 'Approve token',          sub: 'Authorizing contract spend…'     },
  { label: 'Submit to bridge',       sub: 'Signing and sending transaction…' },
  { label: 'Confirming source chain',sub: 'Awaiting block confirmations…'    },
  { label: 'Relaying cross-chain',   sub: 'Bridging to destination network…' },
  { label: 'Delivered',              sub: 'Assets arrived safely!'            },
]
const DELAYS = [1100, 2400, 4000, 5000]

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

  const mockHash = '0x' + Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('') + '…'

  return (
    <div className="backdrop fade-in" onClick={e => { if (e.target === e.currentTarget && done) onClose() }}>
      <div className="bridge-card fade-up" style={{ maxWidth: 420 }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 20px 16px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--t1)' }}>
              {done ? '✓ Bridge complete' : 'Bridging in progress'}
            </p>
            <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 3 }}>
              {fc.icon} {fc.name} → {tc.icon} {tc.name}
            </p>
          </div>
          {done && (
            <button className="btn-ghost" onClick={onClose}>Close</button>
          )}
        </div>

        {/* Amount card */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderRadius: 16,
            background: 'var(--bg-panel)', border: '1px solid var(--border)',
          }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--t3)', marginBottom: 4 }}>
                Sending
              </p>
              <p className="mono" style={{ fontSize: 20, fontWeight: 800, color: 'var(--t1)' }}>
                {amount} {token}
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--t4)' }}>
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--t3)', marginBottom: 4 }}>
                Receiving
              </p>
              <p className="mono" style={{ fontSize: 20, fontWeight: 800, color: done ? 'var(--green)' : 'var(--t1)' }}>
                {fee.receiveAmount} {token}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {STEPS.map((s, i) => {
            const isDone   = i < step
            const isActive = i === step && !done

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {/* Step circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone   ? 'rgba(34,197,94,.12)' :
                              isActive ? 'rgba(59,130,246,.12)' : 'var(--bg-panel)',
                  border: `1px solid ${
                    isDone   ? 'rgba(34,197,94,.3)' :
                    isActive ? 'rgba(59,130,246,.35)' : 'var(--border)'
                  }`,
                  boxShadow: isActive ? '0 0 0 3px rgba(59,130,246,.08)' : 'none',
                  transition: 'all .3s',
                }}>
                  {isDone && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--green)' }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {isActive && <div className="spinner" />}
                  {!isDone && !isActive && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--t4)' }} />
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, paddingTop: 5 }}>
                  <p style={{
                    fontSize: 13, fontWeight: 600,
                    color: isDone ? 'var(--green)' : isActive ? 'var(--t1)' : 'var(--t4)',
                    transition: 'color .3s',
                  }}>{s.label}</p>
                  {isActive && (
                    <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>{s.sub}</p>
                  )}
                  {isDone && i === 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <p className="mono" style={{ fontSize: 10, color: 'var(--t4)' }}>{mockHash}</p>
                      <a href="#" onClick={e => e.preventDefault()} style={{
                        fontSize: 10, color: 'var(--blue)', textDecoration: 'none', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: 3,
                      }}>
                        Explorer ↗
                      </a>
                    </div>
                  )}
                </div>

                {/* Step number */}
                {!isDone && !isActive && (
                  <span style={{ fontSize: 11, color: 'var(--t4)', paddingTop: 6 }}>{i + 1}</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        {!done && (
          <div style={{ margin: '20px 20px 0', height: 3, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              width: `${(step / STEPS.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--blue), var(--purple))',
              transition: 'width .7s cubic-bezier(.16,1,.3,1)',
            }} />
          </div>
        )}

        {/* Done CTA */}
        <div style={{ padding: done ? '20px 20px 20px' : '16px 20px 20px' }}>
          {done ? (
            <button className="btn-bridge" onClick={onClose}>Bridge again</button>
          ) : (
            <p style={{ fontSize: 11, color: 'var(--t4)', textAlign: 'center' }}>
              Do not close this window during bridging
            </p>
          )}
        </div>

      </div>
    </div>
  )
}
