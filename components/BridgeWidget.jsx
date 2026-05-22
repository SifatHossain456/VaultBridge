'use client'
import { useState, useCallback } from 'react'
import ChainSelector from './ChainSelector'
import TokenSelector from './TokenSelector'
import RouteInfo    from './RouteInfo'
import TxModal      from './TxModal'
import { TOKENS, MOCK_BALANCES, getBridgeFee } from '@/lib/data'

export default function BridgeWidget() {
  const [fromChain, setFromChain] = useState('ethereum')
  const [toChain,   setToChain]   = useState('arbitrum')
  const [token,     setToken]     = useState('ETH')
  const [amount,    setAmount]    = useState('')
  const [showModal, setShowModal] = useState(false)

  const fee     = getBridgeFee(amount, token)
  const tokMeta = TOKENS.find(t => t.symbol === token)
  const balance = MOCK_BALANCES[token] ?? '0'
  const usdVal  = amount && tokMeta ? (parseFloat(amount) * tokMeta.price).toFixed(2) : null

  const swapChains = useCallback(() => {
    setFromChain(toChain)
    setToChain(fromChain)
  }, [fromChain, toChain])

  const handleTokenChange = useCallback((sym) => {
    setToken(sym)
    setAmount('')
  }, [])

  const canBridge = fee && parseFloat(amount) > 0

  return (
    <>
      <div className="widget p-6 space-y-4 w-full max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black" style={{ color: 'var(--t1)' }}>Bridge Assets</h2>
          <button className="btn-ghost flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--t2)' }}>
              <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2m0 18v-2m10-8h-2M4 12H2"/>
            </svg>
            Slippage: 0.5%
          </button>
        </div>

        {/* FROM */}
        <div className="rounded-2xl p-4 space-y-3" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--t3)' }}>From</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px]" style={{ color: 'var(--t3)' }}>
                Balance: <span className="font-bold" style={{ color: 'var(--t2)' }}>{balance} {token}</span>
              </span>
              <button
                onClick={() => setAmount(balance.replace(/,/g, ''))}
                className="text-[10px] font-bold px-2 py-0.5 rounded-lg transition-colors"
                style={{ background: 'rgba(0,212,255,.1)', color: 'var(--cyan)', border: '1px solid rgba(0,212,255,.2)' }}>
                MAX
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <ChainSelector value={fromChain} onChange={setFromChain} exclude={toChain} />
              <TokenSelector value={token} onChange={handleTokenChange} chain={fromChain} />
            </div>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              className="amount-input text-right"
              aria-label="Amount to bridge"
            />
          </div>

          {usdVal && (
            <p className="text-right text-[11px]" style={{ color: 'var(--t3)' }}>${usdVal}</p>
          )}
        </div>

        {/* SWAP button */}
        <div className="flex items-center justify-center -my-1">
          <button
            onClick={swapChains}
            aria-label="Swap chains"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #0d1825, #0a1020)',
              border: '1px solid var(--border-hi)',
              boxShadow: '0 4px 12px rgba(0,0,0,.4)',
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--cyan)' }}>
              <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
          </button>
        </div>

        {/* TO */}
        <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(0,212,255,.03)', border: '1px solid var(--border)' }}>
          <span className="text-[10px] uppercase tracking-widest font-bold block" style={{ color: 'var(--t3)' }}>To</span>
          <div className="flex items-center gap-3">
            <ChainSelector value={toChain} onChange={setToChain} exclude={fromChain} />
            <div className="flex-1 text-right">
              {fee ? (
                <>
                  <p className="text-2xl font-black mono" style={{ color: 'var(--green)' }}>
                    {fee.receiveAmount}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--t3)' }}>${fee.receiveUsd}</p>
                </>
              ) : (
                <p className="text-2xl font-black mono" style={{ color: 'var(--t4)' }}>0.00</p>
              )}
            </div>
          </div>
        </div>

        {/* Route info */}
        {fee && <RouteInfo fromChain={fromChain} toChain={toChain} token={token} fee={fee} />}

        {/* Bridge button */}
        <button
          disabled={!canBridge}
          onClick={() => setShowModal(true)}
          className="btn-primary">
          {canBridge ? `Bridge ${amount} ${token} →` : 'Enter an amount'}
        </button>

        {/* Disclaimer */}
        <p className="text-[10px] text-center" style={{ color: 'var(--t4)' }}>
          Bridge is secured by decentralized relayers · Always verify addresses
        </p>
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
