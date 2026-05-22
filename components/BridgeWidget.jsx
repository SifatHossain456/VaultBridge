'use client'
import { useState, useCallback } from 'react'
import ChainSelector from './ChainSelector'
import TokenSelector from './TokenSelector'
import TxModal       from './TxModal'
import { TOKENS, MOCK_BALANCES, getBridgeFee, CHAINS } from '@/lib/data'

function SwapIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2m0 18v-2m10-8h-2M4 12H2"/>
    </svg>
  )
}

function InfoRow({ label, value, valueColor, sub }) {
  return (
    <div className="route-row">
      <span style={{ color: 'var(--t3)' }}>{label}</span>
      <span style={{ color: valueColor ?? 'var(--t2)', fontWeight: 600, fontSize: 12 }}>
        {value}
        {sub && <span style={{ color: 'var(--t4)', fontWeight: 400 }}> ({sub})</span>}
      </span>
    </div>
  )
}

const SLIPPAGE_PRESETS = ['0.1', '0.5', '1.0']

export default function BridgeWidget() {
  const [fromChain, setFromChain] = useState('ethereum')
  const [toChain,   setToChain]   = useState('arbitrum')
  const [token,     setToken]     = useState('ETH')
  const [amount,    setAmount]    = useState('')
  const [showModal, setShowModal] = useState(false)
  const [slippage,  setSlippage]  = useState('0.5')
  const [showSlip,  setShowSlip]  = useState(false)

  const fee        = getBridgeFee(amount, token)
  const tokMeta    = TOKENS.find(t => t.symbol === token)
  const balance    = MOCK_BALANCES[token] ?? '0'
  const balanceNum = parseFloat(balance.replace(/,/g, ''))
  const amountNum  = parseFloat(amount)
  const usdValue   = amount && tokMeta && !isNaN(amountNum)
    ? (amountNum * tokMeta.price) : null
  const overBalance = !isNaN(amountNum) && amountNum > balanceNum
  const canBridge   = !!fee && amountNum > 0 && !overBalance

  const swapChains = useCallback(() => {
    setFromChain(prev => { setToChain(prev); return toChain })
  }, [toChain])

  return (
    <>
      <div className="bridge-card fade-up">

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 0' }}>
          <p style={{ fontWeight: 800, fontSize: 16, color: 'var(--t1)', letterSpacing: '-.02em' }}>Bridge</p>
          <button className="btn-ghost" onClick={() => setShowSlip(s => !s)}>
            <GearIcon />
            {slippage}% slippage
          </button>
        </div>

        {/* ── Slippage panel ── */}
        {showSlip && (
          <div className="slide-down" style={{ margin: '12px 20px 0', padding: 14, borderRadius: 14, background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--t3)', marginBottom: 10 }}>
              Max slippage
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SLIPPAGE_PRESETS.map(v => (
                <button key={v} onClick={() => setSlippage(v)} style={{
                  flex: 1, padding: '8px 0', borderRadius: 10, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', transition: 'all .15s',
                  background: slippage === v ? 'var(--blue)' : 'var(--bg-input)',
                  color: slippage === v ? '#fff' : 'var(--t2)',
                  border: `1px solid ${slippage === v ? 'var(--blue)' : 'var(--border)'}`,
                  boxShadow: slippage === v ? '0 4px 12px rgba(59,130,246,.3)' : 'none',
                }}>{v}%</button>
              ))}
              <input value={!SLIPPAGE_PRESETS.includes(slippage) ? slippage : ''}
                onChange={e => setSlippage(e.target.value)}
                placeholder="Custom"
                style={{
                  width: 72, textAlign: 'center', fontSize: 12, fontWeight: 600,
                  borderRadius: 10, padding: '8px 0',
                  background: 'var(--bg-input)', border: '1px solid var(--border)',
                  color: 'var(--t1)', outline: 'none',
                }} />
            </div>
          </div>
        )}

        {/* ── From panel ── */}
        <div style={{ margin: '16px 20px 0' }}>
          <div className="panel" style={{ padding: 16 }}>
            {/* Label + balance */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                From
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--t3)' }}>
                  Balance: <span style={{ color: 'var(--t2)', fontWeight: 600 }}>{balance} {token}</span>
                </span>
                <button className="max-btn" onClick={() => setAmount(balance.replace(/,/g, ''))}>MAX</button>
              </div>
            </div>

            {/* Chain + token selectors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <ChainSelector value={fromChain} onChange={setFromChain} exclude={toChain} />
              <TokenSelector value={token} onChange={t => { setToken(t); setAmount('') }} chain={fromChain} />
            </div>

            {/* Amount */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <input
                type="number" min="0" value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0"
                className="amount-input"
                aria-label="Amount to bridge"
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--t3)', paddingBottom: 4, flexShrink: 0 }}>{token}</span>
            </div>
            {usdValue != null && (
              <p className="mono" style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>
                ≈ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>
        </div>

        {/* ── Swap button ── */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <button className="swap-btn" onClick={swapChains} aria-label="Swap chains">
            <SwapIcon />
          </button>
        </div>

        {/* ── To panel ── */}
        <div style={{ margin: '0 20px' }}>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                To
              </span>
              {fee && (
                <span style={{ fontSize: 10, color: 'var(--t3)' }}>After fees</span>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <ChainSelector value={toChain} onChange={setToChain} exclude={fromChain} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <p className="amount-input" style={{
                flex: 1,
                color: fee ? 'var(--t1)' : 'var(--t4)',
                fontSize: 32, fontWeight: 800,
                display: 'block', lineHeight: 1.2,
              }}>
                {fee ? fee.receiveAmount : '0'}
              </p>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--t3)', paddingBottom: 4, flexShrink: 0 }}>{token}</span>
            </div>
            {fee && (
              <p className="mono" style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>
                ≈ ${parseFloat(fee.receiveUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>
        </div>

        {/* ── Balance warning ── */}
        {overBalance && (
          <div className="slide-down" style={{
            margin: '0 20px', padding: '10px 14px', borderRadius: 12,
            background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.2)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--red)', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600 }}>
              Insufficient balance — you have {balance} {token}
            </span>
          </div>
        )}

        {/* ── Route flowchart + fees ── */}
        {fee && !overBalance && (
          <div className="slide-down" style={{ margin: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>

            {/* Route flowchart */}
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '10px 14px', borderRadius: 12,
              background: 'var(--bg-panel)', border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '50%', fontSize: 12, flexShrink: 0,
                  background: CHAINS[fromChain].color + '1a', border: `1px solid ${CHAINS[fromChain].color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{CHAINS[fromChain].icon}</span>
                <div>
                  <p style={{ fontSize: 9, color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '.06em' }}>From</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--t1)' }}>{CHAINS[fromChain].name}</p>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <div style={{
                  margin: '0 8px', padding: '3px 9px', borderRadius: 99, flexShrink: 0,
                  background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.2)',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--blue)', letterSpacing: '.05em' }}>VaultBridge</span>
                </div>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '50%', fontSize: 12, flexShrink: 0,
                  background: CHAINS[toChain].color + '1a', border: `1px solid ${CHAINS[toChain].color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{CHAINS[toChain].icon}</span>
                <div>
                  <p style={{ fontSize: 9, color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '.06em' }}>To</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--t1)' }}>{CHAINS[toChain].name}</p>
                </div>
              </div>
            </div>

            {/* Fee breakdown */}
            <div style={{ padding: '10px 14px', borderRadius: 12, background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
              <InfoRow label="Bridge fee"   value={`${fee.feeToken} ${token}`} sub={`$${fee.feeUsd}`} />
              <InfoRow label="Gas (source)" value={CHAINS[fromChain].gas} />
              <InfoRow label="Gas (dest)"   value={CHAINS[toChain].gas} />
              <InfoRow label="Est. time"    value={fee.time} valueColor="var(--blue)" />
            </div>
          </div>
        )}

        {/* ── Bridge button ── */}
        <div style={{ padding: '12px 20px 20px' }}>
          <button disabled={!canBridge} onClick={() => setShowModal(true)} className="btn-bridge">
            {overBalance ? 'Insufficient balance' : canBridge ? `Bridge ${amount} ${token} →` : 'Enter an amount'}
          </button>
        </div>

      </div>

      {showModal && (
        <TxModal
          params={{ amount, token, fromChain, toChain, fee }}
          onClose={() => { setShowModal(false); setAmount('') }}
        />
      )}
    </>
  )
}
