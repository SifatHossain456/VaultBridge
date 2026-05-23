const RPCS = [
  'https://eth.llamarpc.com',
  'https://cloudflare-eth.com',
  'https://rpc.ankr.com/eth',
]

export async function GET() {
  for (const rpc of RPCS) {
    try {
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_gasPrice', params: [], id: 1 }),
        next: { revalidate: 12 },
      })
      const json = await res.json()
      const gwei = (parseInt(json.result, 16) / 1e9).toFixed(1)
      return Response.json({ gwei })
    } catch {}
  }
  return Response.json({ gwei: '—' })
}
