// 📂 C:\Projects\hypercoindashboard-ui\src\WrappedHyperCoinDashboard.jsx

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import {
  HYPERCOIN_CONTRACT,
  APP_NAME,
  TOKEN_SYMBOL,
  TAX_TOKEN,
  BASE_RATE,
  IPFS_ENABLED,
  IS_ADMIN
} from "./config";

// 🧩 Components
import HyperBurn from "./import HyperBurn from "./HyperBurn.jsx";;
import InTaxSwap from "./import InTaxSwap from "./InTaxSwap.jsx";
import TreasuryControls from "./import TreasuryControls from "./TreasuryControls.jsx";
import DAOVoting from "./import DAOVoting from "./DAOVoting.jsx";
import GlobalToggle from "./import GlobalToggle from "./GlobalToggle.jsx";
import LiveFeedPanel from "./import LiveFeedPanel from "./LiveFeedPanel.jsx";
import NoWalletAlert from "./import NoWalletAlert from "./NoWalletAlert.jsx";
import StockCoinMintForm from "./import StockCoinMintForm from "./StockCoinMintForm.jsx";
import HyperSwap from ".//HyperSwap.jsx";
import BridgeUI from "./import BridgeUI from "./BridgeUI.jsx";

export default function WrappedHyperCoinDashboard() {
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [status, setStatus] = useState("🦊 Please connect your MetaMask.");
  const [rbtcBalance, setRBTCBalance] = useState(null);
  const [hypeBalance, setHypeBalance] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setWallet(window.ethereum);
    } else {
      setStatus("❌ MetaMask not detected.");
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!wallet) return setStatus("❌ No wallet detected.");
      const accounts = await wallet.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setUserAddress(address);
      setStatus(`✅ Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);

      const provider = new ethers.BrowserProvider(wallet);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(address);
      setRBTCBalance(ethers.formatEther(balance));

      const hype = new ethers.Contract(HYPERCOIN_CONTRACT, abi, signer);
      const hypeBal = await hype.balanceOf(address);
      setHypeBalance(ethers.formatUnits(hypeBal, 18));
    } catch (err) {
      console.error("❌ Wallet connect error:", err);
      setStatus("❌ Wallet connection failed.");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🌐 {APP_NAME} Dashboard
      </h1>

      {!wallet && <NoWalletAlert />}
      <button
        onClick={connectWallet}
        style={{
          padding: "12px 20px",
          backgroundColor: "#22c55e",
          color: "#000",
          border: "none",
          borderRadius: "6px",
          marginBottom: "1rem",
          fontWeight: "bold"
        }}
      >
        {userAddress ? "Wallet Connected" : "Connect Wallet"}
      </button>

      <p>{status}</p>

      {userAddress && (
        <>
          <div style={{ marginTop: "1.5rem" }}>
            <h3>💳 Wallet Info</h3>
            <p><strong>Address:</strong> {userAddress}</p>
            <p><strong>RBTC Balance:</strong> {rbtcBalance} RBTC</p>
            <p><strong>{TOKEN_SYMBOL} Balance:</strong> {hypeBalance} {TOKEN_SYMBOL}</p>
          </div>

          <GlobalToggle onModeChange={(mode) => console.log("🧠 Mode set to:", mode)} isAdmin={IS_ADMIN} />
          <InTaxSwap onSwapComplete={() => connectWallet()} />
          <HyperSwap />
          <HyperBurn />
          <DAOVoting />
          <TreasuryControls />
          <StockCoinMintForm />
          <BridgeUI />
          <LiveFeedPanel />
        </>
      )}
    </div>
  );
}
