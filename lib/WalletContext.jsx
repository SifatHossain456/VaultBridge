'use client'
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const WalletContext = createContext(null)

const CHAIN_NAMES = {
  1:     'Ethereum',
  42161: 'Arbitrum',
  8453:  'Base',
  10:    'Optimism',
  137:   'Polygon',
  56:    'BNB Chain',
  43114: 'Avalanche',
}

export function WalletProvider({ children }) {
  const [address,    setAddress]    = useState(null)
  const [chainId,    setChainId]    = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [balances,   setBalances]   = useState({})
  const balanceTimer = useRef(null)

  const fetchBalances = useCallback(async (addr) => {
    if (!addr) return
    try {
      const res = await fetch(`/api/balance?address=${addr}`)
      const json = await res.json()
      if (json.balances) setBalances(json.balances)
    } catch {}
  }, [])

  const connect = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('MetaMask not found.\n\nInstall MetaMask (metamask.io) and refresh.')
      return
    }
    setConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const chainHex = await window.ethereum.request({ method: 'eth_chainId' })
      const addr = accounts[0]
      setAddress(addr)
      setChainId(parseInt(chainHex, 16))
      fetchBalances(addr)
    } catch (e) {
      if (e.code !== 4001) console.error(e) // ignore user rejection
    } finally {
      setConnecting(false)
    }
  }, [fetchBalances])

  const disconnect = useCallback(() => {
    setAddress(null)
    setChainId(null)
    setBalances({})
  }, [])

  // Auto-refresh balances every 30s
  useEffect(() => {
    if (!address) return
    balanceTimer.current = setInterval(() => fetchBalances(address), 30000)
    return () => clearInterval(balanceTimer.current)
  }, [address, fetchBalances])

  // Listen to MetaMask events
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const onAccounts = (accounts) => {
      const addr = accounts[0] || null
      setAddress(addr)
      if (addr) fetchBalances(addr)
      else setBalances({})
    }
    const onChain = (hex) => setChainId(parseInt(hex, 16))

    window.ethereum.on('accountsChanged', onAccounts)
    window.ethereum.on('chainChanged',    onChain)

    // Restore session if already connected
    window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
      if (accounts[0]) {
        setAddress(accounts[0])
        fetchBalances(accounts[0])
        window.ethereum.request({ method: 'eth_chainId' }).then(hex =>
          setChainId(parseInt(hex, 16))
        )
      }
    }).catch(() => {})

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccounts)
      window.ethereum.removeListener('chainChanged', onChain)
    }
  }, [fetchBalances])

  const shortAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : null

  const chainName = CHAIN_NAMES[chainId] ?? (chainId ? `Chain ${chainId}` : null)

  return (
    <WalletContext.Provider value={{
      address, chainId, chainName, shortAddress,
      connecting, balances,
      connect, disconnect,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
