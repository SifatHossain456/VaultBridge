'use client'
import { WalletProvider } from '@/lib/WalletContext'

export default function ClientProviders({ children }) {
  return <WalletProvider>{children}</WalletProvider>
}
