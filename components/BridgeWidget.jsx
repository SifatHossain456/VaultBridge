'use client'
import { useState, useCallback } from 'react'
import ChainSelector from './ChainSelector'
import TokenSelector from './TokenSelector'
import TxModal       from './TxModal'
import { TOKENS, MOCK_BALANCES, getBridgeFee, CHAINS } from '@/lib/data'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2m0 18v-2m10-8h-2M4 12H2"/>
    </svg>
  )
}

export default function BridgeWidget() {
  const [fromChain, setFromChain] = useState('ethereum')
  const [toChain,   setToChain]   = useState('arbitrum')
  const [token,     setToken]     = useState('ETH')
  const [amount,    setAmount]    = useState('')
  const [showModal, setShowModal] = useState(false)
  const [slippage,  setSlippage]  = useState('0.5')
  const [showSlip,  setShowSlip]  = useState(false)

  const fee      = getBridgeFee(amount, token)
  const tokMeta  = TOKENS.find(t => t.symbol === token)
  const balance  = MOCK_BALANCES[token] ?? '0'
  const usdValue = amount && tokMeta ? (parseFloat(amount) * tokMeta.price) : null
  const canBridge = fee && parseFloat(amount) > 0

  const swapChains = useCallback(() => {
    setFromChain(toChain)
    setToChain(fromChain)
  }, [fromChain, toChain])

  const setMax = useCallback(() => {
    setAmount(balance.replace(/,/g, ''))
  }, [balance])

  return (
    <>
      <div className="bridge-card p-5 w-full" style={{ maxWidth: 468 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[15px] font-bold" style={{ color: 'var(--t1)' }}>Bridge</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSlip(s => !s)} className="btn-ghost" style={{ position: 'relative' }}>
              <SettingsIcon />
              <span>Slippage: {slippage}%</span>
            </button>
          </div>
        </div>

        {/* Slippage panel */}
        {showSlip && (
          <div className="mb-4 p-3 rounded-xl slide-down" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
            <p className="text-[11px] font-bold mb-2" style={{ color: 'var(--t3)' }}>MAX SLIPPAGE</p>
            <div className="flex gap-2">
              {['0.1', '0.5', '1.0'].map(v => (
                <button key={v} onClick={() => setSlippage(v)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  style={{
                    background: slippage === v ? 'var(--blue)' : 'var(--bg-input)',
                    color: slippage === v ? '#fff' : 'var(--t2)',
                    border: '1px solid ' + (slippage === v ? 'var(--blue)' : 'var(--border)'),
                  }}>
                  {v}%
                </button>
              ))}
              <input value={slippage} onChange={e => setSlippage(e.target.value)}
                className="w-16 text-center text-xs rounded-lg font-mono"
                style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--t1)', outline: 'none', padding: '6px 8px' }}
                placeholder="Custom" />
            </div>
          </div>
        )}

        {/* FROM panel */}
        <div className="panel p-4 mb-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold" style={{ color: 'var(--t3)' }}>From</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ color: 'var(--t3)' }}>
                Balance: <span className="font-semibold" style={{ color: 'var(--t2)' }}>{balance}</span>
              </span>
              <button onClick={setMax}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                style={{ background: 'rgba(59,130,246,.1)', color: 'var(--blue)', border: '1px solid rgba(59,130,246,.2)' }}>
                MAX
              </button>
            </div>
          </div>

          {/* Chain + Token row */}
          <div className="flex items-center gap-2 mb-3">
            <ChainSelector value={fromChain} onChange={setFromChain} exclude={toChain} />
            <TokenSelector value={token} onChange={t => { setToken(t); setAmount('') }} chain={fromChain} />
          </div>

          {/* Amount input */}
          <div className="flex items-end justify-between gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="number" min="0" value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="amount-input"
                aria-label="Amount to bridge"
              />
              {usdValue != null && (
                <p className="text-[11px] mt-0.5 mono" style={{ color: 'var(--t3)' }}>
                  ≈ ${usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              )}
            </div>
            <span className="text-lg font-black mb-0.5 shrink-0" style={{ color: 'var(--t3)' }}>{token}</span>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex items-center justify-center -my-0.5 relative z-10">
          <button onClick={swapChains} className="swap-btn" aria-label="Swap chains">
            <ArrowIcon />
          </button>
        </div>

        {/* TO panel */}
        <div className="panel p-4 mt-1 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold" style={{ color: 'var(--t3)' }}>To</span>
            {fee && (
              <span className="text-[10px]" style={{ color: 'var(--t3)' }}>
                After fees
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <ChainSelector value={toChain} onChange={setToChain} exclude={fromChain} />
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[26px] font-extrabold mono" style={{ color: fee ? 'var(--t1)' : 'var(--t4)', lineHeight: 1.2 }}>
                {fee ? fee.receiveAmount : '0.00'}
              </p>
              {fee && (
                <p className="text-[11px] mt-0.5 mono" style={{ color: 'var(--t3)' }}>
                  ≈ ${parseFloat(fee.receiveUsd).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              )}
            </div>
            <span className="text-lg font-black mb-0.5 shrink-0" style={{ color: 'var(--t3)' }}>{token}</span>
          </div>
        </div>

        {/* Route & fee breakdown */}
        {fee && (
          <div className="mb-4 px-1 slide-down">
            {[
              { label: 'Bridge fee',   value: `${fee.feeToken} ${token}`, sub: `$${fee.feeUsd}` },
              { label: 'Source gas',   value: CHAINS[fromChain].gas },
              { label: 'Dest gas',     value: CHAINS[toChain].gas },
              { label: 'Est. time',    value: fee.time, highlight: true },
            ].map(row => (
              <div key={row.label} className="route-row">
                <span style={{ color: 'var(--t3)' }}>{row.label}</span>
                <span style={{ color: row.highlight ? 'var(--blue)' : 'var(--t2)', fontWeight: 600 }}>
                  {row.value}
                  {row.sub && <span style={{ color: 'var(--t4)', fontWeight: 400 }}> ({row.sub})</span>}
                </span>
              </div>
            ))}
            <div className="route-row">
              <span style={{ color: 'var(--t3)' }}>Route</span>
              <span style={{ color: 'var(--t2)', fontSize: 11 }}>
                {CHAINS[fromChain].icon} {CHAINS[fromChain].name} → VaultBridge → {CHAINS[toChain].icon} {CHAINS[toChain].name}
              </span>
            </div>
          </div>
        )}

        {/* Bridge button */}
        <button disabled={!canBridge} onClick={() => setShowModal(true)} className="btn-bridge">
          {canBridge ? `Bridge ${amount} ${token}` : 'Enter an amount'}
        </button>

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
