'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('[VaultBridge] Error:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1rem',
      background: '#08090e',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚠️</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f0f4ff' }}>
        Something went wrong
      </h1>
      <p style={{ marginBottom: '1.5rem', maxWidth: '24rem', fontSize: '0.875rem', color: '#404869', lineHeight: 1.7 }}>
        {error.message || 'Failed to load bridge data. Check your wallet connection and try again.'}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem',
            background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <a href="/" style={{
          padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem',
          border: '1px solid #1e2130', color: '#404869', textDecoration: 'none',
        }}>
          Go home
        </a>
      </div>
    </div>
  )
}
