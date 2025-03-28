import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const HYPE_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F";
const ADMIN_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F";

export default function HyperMint({ onMintComplete }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const detectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletConnected(true);
          setCurrentAccount(accounts[0].toLowerCase());
        }
      }
    };
    detectWallet();
  }, []);

  const mintHYPE = async () => {
    try {
      if (!window.ethereum) return setStatus("🦊 MetaMask not detected");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(HYPE_ADDRESS, abi, signer);

      const tx = await contract.mint(
        ADMIN_ADDRESS,
        ethers.utils.parseUnits(amount, 18)
      );

      setStatus("⏳ Awaiting confirmation...");
      await tx.wait();
      setStatus("✅ Mint successful!");
      if (onMintComplete) onMintComplete();
    } catch (err) {
      console.error("❌ Mint failed:", err);
      setStatus("❌ Mint failed – are you the owner?");
    }
  };

  if (!walletConnected || currentAccount !== ADMIN_ADDRESS.toLowerCase()) {
    return null;
  }

  return (
    <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#1e293b", borderRadius: "8px", color: "#fff" }}>
      <h2>🏛️ Admin Mint Panel</h2>
      <p>Mint to: <strong>{ADMIN_ADDRESS}</strong></p>
      <input
        type="text"
        placeholder="Amount to Mint"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "8px", marginBottom: "1rem", width: "100%" }}
      />
      <button
        onClick={mintHYPE}
        style={{ padding: "10px 20px", backgroundColor: "#fbbf24", border: "none", borderRadius: "6px", color: "#000", fontWeight: "bold" }}
      >
        Mint HYPE
      </button>
      <p>{status}</p>
    </div>
  );
}
