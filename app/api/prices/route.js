const COINGECKO_IDS = 'ethereum,usd-coin,tether,wrapped-bitcoin,binancecoin,avalanche-2,matic-network,solana'

export async function GET() {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS}&vs_currencies=usd`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error('CoinGecko error')
    const data = await res.json()
    return Response.json({ ok: true, data })
  } catch {
    // Fallback static prices
    return Response.json({
      ok: false,
      data: {
        ethereum:       { usd: 3120 },
        'usd-coin':     { usd: 1 },
        tether:         { usd: 1 },
        'wrapped-bitcoin': { usd: 67400 },
        binancecoin:    { usd: 412 },
        'avalanche-2':  { usd: 38 },
        'matic-network':{ usd: 0.58 },
        solana:         { usd: 178 },
      },
    })
  }
}
