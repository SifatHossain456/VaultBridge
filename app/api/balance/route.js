const RPCS = ['https://eth.llamarpc.com', 'https://cloudflare-eth.com']

// ERC-20 contract addresses on Ethereum mainnet
const ERC20 = {
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
}

function encodeBalanceOf(address) {
  const sig = '0x70a08231'
  const padded = address.toLowerCase().replace('0x', '').padStart(64, '0')
  return sig + padded
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')
  if (!address) return Response.json({ error: 'No address' }, { status: 400 })

  for (const rpc of RPCS) {
    try {
      // ETH balance
      const ethRes = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_getBalance', params: [address, 'latest'], id: 1 }),
      })
      const ethJson = await ethRes.json()
      const ethBal = (parseInt(ethJson.result, 16) / 1e18).toFixed(4)

      // ERC-20 balances in parallel
      const erc20Results = await Promise.allSettled(
        Object.entries(ERC20).map(async ([sym, contract]) => {
          const res = await fetch(rpc, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0', method: 'eth_call',
              params: [{ to: contract, data: encodeBalanceOf(address) }, 'latest'], id: 1,
            }),
          })
          const json = await res.json()
          const raw = parseInt(json.result, 16)
          const decimals = sym === 'WBTC' ? 8 : 6
          return [sym, (raw / Math.pow(10, decimals)).toFixed(decimals === 8 ? 6 : 2)]
        })
      )

      const balances = { ETH: ethBal }
      erc20Results.forEach(r => {
        if (r.status === 'fulfilled') balances[r.value[0]] = r.value[1]
      })

      return Response.json({ balances })
    } catch {}
  }
  return Response.json({ error: 'RPC failed' }, { status: 500 })
}
