export const CHAINS = {
  ethereum:  { id: 1,      name: 'Ethereum',  shortName: 'ETH',  icon: '⟠', color: '#627eea', gas: '$2.40' },
  arbitrum:  { id: 42161,  name: 'Arbitrum',  shortName: 'ARB',  icon: '🔷', color: '#12aaff', gas: '$0.08' },
  base:      { id: 8453,   name: 'Base',      shortName: 'BASE', icon: '🔵', color: '#2563eb', gas: '$0.05' },
  optimism:  { id: 10,     name: 'Optimism',  shortName: 'OP',   icon: '🔴', color: '#ff0420', gas: '$0.12' },
  polygon:   { id: 137,    name: 'Polygon',   shortName: 'POL',  icon: '🟣', color: '#8247e5', gas: '$0.01' },
  bsc:       { id: 56,     name: 'BNB Chain', shortName: 'BSC',  icon: '🟡', color: '#f0b90b', gas: '$0.15' },
  avalanche: { id: 43114,  name: 'Avalanche', shortName: 'AVAX', icon: '🔺', color: '#e84142', gas: '$0.10' },
  solana:    { id: 900,    name: 'Solana',    shortName: 'SOL',  icon: '◎',  color: '#9945ff', gas: '$0.00' },
}

export const TOKENS = [
  { symbol: 'ETH',  name: 'Ethereum',       icon: '⟠', price: 3120.50, chains: ['ethereum','arbitrum','base','optimism'] },
  { symbol: 'USDC', name: 'USD Coin',        icon: '💵', price: 1.00,   chains: ['ethereum','arbitrum','base','optimism','polygon','solana'] },
  { symbol: 'USDT', name: 'Tether USD',      icon: '💚', price: 1.00,   chains: ['ethereum','arbitrum','base','polygon','bsc','avalanche'] },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿',  price: 67400,  chains: ['ethereum','arbitrum','base','polygon'] },
  { symbol: 'BNB',  name: 'BNB',             icon: '🟡', price: 412.30, chains: ['bsc','ethereum'] },
  { symbol: 'AVAX', name: 'Avalanche',       icon: '🔺', price: 38.20,  chains: ['avalanche','ethereum'] },
  { symbol: 'POL',  name: 'Polygon',         icon: '🟣', price: 0.58,   chains: ['polygon','ethereum'] },
  { symbol: 'SOL',  name: 'Solana',          icon: '◎',  price: 178.90, chains: ['solana'] },
]

export const MOCK_BALANCES = {
  ETH:  '2.3410',
  USDC: '4,820.00',
  USDT: '1,200.00',
  WBTC: '0.0182',
  BNB:  '5.4400',
  AVAX: '32.100',
  POL:  '1,540.0',
  SOL:  '12.800',
}

export const RECENT_TXS = [
  {
    id: 'tx-001',
    token: 'ETH',
    amount: '0.500',
    from: 'ethereum',
    to: 'arbitrum',
    status: 'completed',
    time: '2m ago',
    hash: '0x4f3a...8c2d',
    valueUsd: '$1,560',
  },
  {
    id: 'tx-002',
    token: 'USDC',
    amount: '2,000',
    from: 'polygon',
    to: 'base',
    status: 'completed',
    time: '18m ago',
    hash: '0x9b1e...4a77',
    valueUsd: '$2,000',
  },
  {
    id: 'tx-003',
    token: 'WBTC',
    amount: '0.015',
    from: 'ethereum',
    to: 'optimism',
    status: 'bridging',
    time: '1h ago',
    hash: '0x2d7c...1f09',
    valueUsd: '$1,011',
  },
  {
    id: 'tx-004',
    token: 'BNB',
    amount: '3.200',
    from: 'bsc',
    to: 'ethereum',
    status: 'completed',
    time: '3h ago',
    hash: '0xae8f...55c1',
    valueUsd: '$1,319',
  },
  {
    id: 'tx-005',
    token: 'SOL',
    amount: '8.500',
    from: 'solana',
    to: 'ethereum',
    status: 'failed',
    time: '5h ago',
    hash: '0x77d2...3bb4',
    valueUsd: '$1,521',
  },
]

export const STATS = {
  tvl:      '$4.82B',
  volume24: '$218M',
  chains:   Object.keys(CHAINS).length,
  txCount:  '2.4M',
}

export function getBridgeFee(amount, token) {
  const num = parseFloat(amount)
  if (!num || isNaN(num)) return null
  const tok = TOKENS.find(t => t.symbol === token)
  if (!tok) return null
  const usdValue = num * tok.price
  const feeUsd   = Math.max(0.5, usdValue * 0.0005)
  const feeToken = (feeUsd / tok.price).toFixed(token === 'USDC' || token === 'USDT' ? 2 : 6)
  const receiveAmount = (num - parseFloat(feeToken)).toFixed(token === 'USDC' || token === 'USDT' ? 2 : 6)
  return {
    feeToken, feeUsd: feeUsd.toFixed(2),
    receiveAmount,
    receiveUsd: ((num - parseFloat(feeToken)) * tok.price).toFixed(2),
    time: '~2 min',
  }
}
