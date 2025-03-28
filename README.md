# 🌐 HyperOS - Decentralized Treasury & Sovereign Finance

HyperOS is a decentralized finance dashboard running on the Rootstock blockchain powered by HyperCoin.  
It includes treasury control, DAO voting, insurance pools, stockcoin exchange, and BTC↔RBTC bridging.

---

## 🧩 Features

- 💱 HyperSwap (RBTC ↔ INTAX / HYPE)
- 🔐 MultiSig Treasury w/ DAO voting
- 🏦 DeFi Lending + Insurance Flow
- 🪙 StockCoin tokenization (Real-world asset minting)
- 🌉 BTC to RBTC Bridge using Blockstream API
- 📡 IPFS support for documents & proofs
- 📈 Real-time StockCoin Exchange dashboard

---

## 🛠️ Dev Setup

```bash
npm install
npm start        # Launch dashboard
npm run start:bridge   # Launch backend BTC bridge listener
```

---

## 🚀 Deployment

Ready for Netlify / Vercel

```bash
npm run build
```

Use Vercel to deploy from GitHub:  
👉 https://vercel.com/new?teamSlug=cryptobank

---

## 📁 Directory Overview

```
/src
  ├── WrappedHyperCoinDashboard.jsx
  ├── config.js
  ├── HyperSwap.jsx
  ├── DAOVoting.jsx
  ├── TreasuryControls.jsx
  ├── StockCoinMintForm.jsx
  ├── BridgeUI.jsx
  ├── ...
```

---

## 📜 License

🛡️ Proprietary — all rights reserved by `coinrepos`.

---

## 🤖 Coming Soon

- 🧠 HyperBot for autonomous DAO operations
- 🌐 hypercoin.live full website routing
- 💰 BTC Fee Optimization with internal bridge profits
- 🪙 Add 4 new asset tokens for StockCoinExchange
