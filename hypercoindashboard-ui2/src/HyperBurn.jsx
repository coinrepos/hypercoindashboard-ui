import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const HYPE_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F";
const INTAX_ADDRESS = "0x000000000000000000000000000000000000dEaD"; // replace with actual INX
const AUTHORIZED_ADDRESSES = [
  "0xb83b08bd688739dcf499091B7596931c2DD8835F" // Admin or DAO wallet
];

// 🗳️ Simulated DAO toggle
let daoApprovedBurn = true;

export default function HyperBurn({ onBurnComplete }) {
  const [currentAccount, setCurrentAccount] = useState("");
  const [token, setToken] = useState("HYPE");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [throttleCheck, setThrottleCheck] = useState(false);

  useEffect(() => {
    const detect = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const addr = accounts[0].toLowerCase();
          setCurrentAccount(addr);
          setIsAuthorized(AUTHORIZED_ADDRESSES.includes(addr));
        }
      }
    };
    detect();
  }, []);

  const burnTokens = async () => {
    if (!daoApprovedBurn) {
      return setStatus("🛑 DAO voting has paused burning.");
    }

    if (parseFloat(amount) > 1000000) {
      return setThrottleCheck(true); // Simulated time-lock throttle
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const target = token === "HYPE" ? HYPE_ADDRESS : INTAX_ADDRESS;
      const contract = new ethers.Contract(target, abi, signer);

      const tx = await contract.burn(ethers.utils.parseUnits(amount, 18));
      setStatus("🔥 Burning...");
      await tx.wait();
      setStatus("✅ Burn complete.");

      const newRecord = {
        time: new Date().toLocaleString(),
        token,
        amount
      };
      setHistory((prev) => [newRecord, ...prev]);

      if (onBurnComplete) onBurnComplete();
    } catch (err) {
      console.error("❌ Burn failed", err);
      setStatus("❌ Burn failed");
    }
  };

  if (!isAuthorized) return null;

  return (
    <div style={{ backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "8px", color: "#fff", marginTop: "2rem" }}>
      <h2>🔥 Token Burn Panel (Admin/Gov)</h2>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        Select Token:
        <select
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "1rem", padding: "6px", borderRadius: "4px" }}
        >
          <option value="HYPE">HYPE</option>
          <option value="INTAX">INTAX</option>
        </select>
      </label>

      <input
        type="text"
        placeholder="Amount to Burn"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", marginBottom: "1rem", width: "100%" }}
      />

      <button
        onClick={burnTokens}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        Burn {token}
      </button>

      <p style={{ marginTop: "1rem", color: "lightgreen" }}>{status}</p>

      {throttleCheck && (
        <p style={{ color: "#facc15" }}>
          ⏱️ Burn amount exceeds limit. Timelock activated. Request DAO override.
        </p>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h4>📦 Burn History</h4>
        {history.map((item, i) => (
          <p key={i}>
            [{item.time}] {item.amount} {item.token}
          </p>
        ))}
      </div>
    </div>
  );
}
