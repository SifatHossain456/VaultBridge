import { useState, useEffect } from 'react'

const GECKO_TO_SYMBOL = {
  ethereum:          'ETH',
  'usd-coin':        'USDC',
  tether:            'USDT',
  'wrapped-bitcoin': 'WBTC',
  binancecoin:       'BNB',
  'avalanche-2':     'AVAX',
  'matic-network':   'POL',
  solana:            'SOL',
}

export function usePrices() {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/prices')
        const json = await res.json()
        const mapped = {}
        for (const [id, val] of Object.entries(json.data)) {
          const sym = GECKO_TO_SYMBOL[id]
          if (sym) mapped[sym] = val.usd
        }
        setPrices(mapped)
      } catch {}
    }
    load()
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [])

  return prices
}
