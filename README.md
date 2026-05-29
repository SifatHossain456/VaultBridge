# VaultBridge — Cross-Chain Token Bridge

A sleek cross-chain bridge UI for transferring tokens between Ethereum, Arbitrum, Optimism, Base, Polygon, BSC, and Avalanche. Built with a dark, professional design system.

## Features

- **Bridge Widget** — Select source and destination chain, pick a token, enter amount; shows estimated time, fee, and minimum received
- **Popular Routes** — One-click pre-fill for the most common bridge routes (ETH → Arbitrum, USDC → Base, etc.)
- **Recent Transactions** — Live transaction history with status indicators (Pending / Confirmed / Failed)
- **Supported Chains** — Visual grid of all supported networks with their native tokens
- **Stats Bar** — Total volume bridged, total transactions, average transfer time, and active routes
- **Animated TX Modal** — Step-by-step transaction progress: Approving → Bridging → Confirming

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 + CSS variables |
| Web3 | wagmi v2 + RainbowKit (optional) |

## Getting Started

```bash
git clone https://github.com/SifatHossain456/vaultbridge.git
cd vaultbridge
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables required for the UI (simulated bridge flow).

## Supported Chains

| Chain | Token | Fee |
|-------|-------|-----|
| Ethereum | ETH, USDC, USDT, DAI, WBTC | Variable |
| Arbitrum | ETH, USDC, ARB | ~$0.10 |
| Optimism | ETH, USDC, OP | ~$0.15 |
| Base | ETH, USDC, CBETH | ~$0.08 |
| Polygon | MATIC, USDC, USDT | ~$0.01 |
| BSC | BNB, USDC, USDT | ~$0.05 |
| Avalanche | AVAX, USDC | ~$0.20 |

## License

MIT
