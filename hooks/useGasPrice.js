import { useState, useEffect } from 'react'

export function useGasPrice() {
  const [gwei, setGwei] = useState('—')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/gas')
        const json = await res.json()
        setGwei(json.gwei)
      } catch {}
    }
    load()
    const t = setInterval(load, 15000)
    return () => clearInterval(t)
  }, [])

  return gwei
}
