import './globals.css'
import Navbar from '@/components/Navbar'
import ClientProviders from '@/components/ClientProviders'

export const metadata = {
  title: { default: 'VaultBridge — Cross-Chain Bridge', template: '%s — VaultBridge' },
  description: 'Bridge assets across 8+ chains in seconds. Fast, secure, and low fees — the easiest cross-chain bridge in DeFi.',
  keywords: ['bridge', 'cross-chain', 'DeFi', 'crypto', 'Ethereum', 'Layer 2', 'asset transfer', 'VaultBridge'],
  openGraph: {
    title: 'VaultBridge — Cross-Chain Bridge',
    description: 'Bridge assets across 8+ chains in seconds. Fast, secure, and low fees.',
    type: 'website',
    siteName: 'VaultBridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VaultBridge — Cross-Chain Bridge',
    description: 'Bridge assets across 8+ chains in seconds. Fast, secure, low fees.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <ClientProviders>
          <Navbar />
          <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  )
}
