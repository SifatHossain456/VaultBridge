import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'VaultBridge — Cross-Chain Bridge',
  description: 'Bridge assets across 8+ chains in seconds. Fast, secure, low fees.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  )
}
