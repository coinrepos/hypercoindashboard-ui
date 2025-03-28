// src/InTaxBurnSimulator.jsx
import React, { useState } from "react";

export default function InTaxBurnSimulator({ userRole }) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const simulate = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    if (userRole === "user") {
      // Users can only swap INX → HYPE
      const rate = 0.85; // fixed HYPE swap rate
      setResult({
        action: "swap",
        receivedHYPE: (amt * rate).toFixed(4),
        message: `✅ You will receive ${amt * rate} HYPE.`
      });
    }

    if (userRole === "government") {
      // Government burn simulation
      const burnRatio = 0.65;
      const rewardRatio = 0.25;
      const burned = amt * burnRatio;
      const rewarded = amt * rewardRatio;
      const treasury = amt - burned - rewarded;

      setResult({
        action: "burn",
        burned: burned.toFixed(2),
        rewarded: rewarded.toFixed(2),
        treasury: treasury.toFixed(2),
        message: `🔥 Burned: ${burned}, Rewarded to Network: ${rewarded}, Sent to Treasury: ${treasury}`
      });
    }

    if (userRole === "admin") {
      // HyperCoin Admin can burn manually (hidden operation logic)
      setResult({
        action: "admin",
        message: `🚨 Admin override enabled. Intax burn simulation complete.`,
        secured: true
      });
    }
  };

  return (
    <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", color: "#fff", marginTop: "2rem", maxWidth: "500px" }}>
      <h2>🔥 InTax Burn / Swap Simulator</h2>
      <p>Enter amount of Intax (INX) to simulate economic outcome:</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Intax amount"
        style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #334155" }}
      />
      <button
        onClick={simulate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#22d3ee",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Simulate
      </button>

      {result && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#334155", borderRadius: "6px" }}>
          <p><strong>💡 {result.message}</strong></p>
          {result.burned && <p>Burned: {result.burned} INX</p>}
          {result.rewarded && <p>Network Reward: {result.rewarded} INX</p>}
          {result.treasury && <p>Treasury Retained: {result.treasury} INX</p>}
          {result.receivedHYPE && <p>HYPE Received: {result.receivedHYPE}</p>}
        </div>
      )}
    </div>
  );
}
