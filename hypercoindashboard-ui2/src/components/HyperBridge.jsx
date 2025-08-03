// src/HyperBridge.jsx
import React, { useState } from "react";

export default function HyperBridge() {
  const [btcAmount, setBtcAmount] = useState("");
  const [expectedRBTC, setExpectedRBTC] = useState(null);
  const [status, setStatus] = useState("Enter BTC amount to convert");
  const [btcAddress] = useState("bc1qexampleaddresshere1234"); // Replace with dynamic backend-fed address

  const calculateRBTC = () => {
    if (!btcAmount || isNaN(btcAmount)) {
      return setStatus("❌ Invalid BTC amount");
    }

    // Example rate: 1 BTC = 1 RBTC, fee = 0.5%
    const rate = 1;
    const fee = 0.005;
    const output = btcAmount * rate * (1 - fee);
    setExpectedRBTC(output.toFixed(6));
    setStatus("✅ Send BTC to the address below");
  };

  return (
    <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "8px", marginTop: "2rem", color: "#f8fafc" }}>
      <h2>🌉 HyperBridge: BTC ➡ RBTC</h2>
      <p>Bridge your Bitcoin directly into Rootstock (RBTC)</p>

      <input
        type="number"
        placeholder="Amount in BTC"
        value={btcAmount}
        onChange={(e) => setBtcAmount(e.target.value)}
        style={{ padding: "0.5rem", width: "200px", marginRight: "1rem" }}
      />
      <button onClick={calculateRBTC} style={{ padding: "0.5rem 1rem", backgroundColor: "#22c55e", color: "#000", fontWeight: "bold" }}>
        Estimate
      </button>

      {expectedRBTC && (
        <>
          <p style={{ marginTop: "1rem" }}>
            💰 You will receive ≈ <strong>{expectedRBTC}</strong> RBTC
          </p>
          <p>⚡ Send <strong>{btcAmount}</strong> BTC to:</p>
          <code style={{ background: "#0f172a", padding: "0.5rem", borderRadius: "6px", display: "inline-block" }}>
            {btcAddress}
          </code>
          <p>🕓 Typically completes in ~10 mins (1 confirmation)</p>
        </>
      )}

      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}
