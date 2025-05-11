// src/BridgeUI.jsx
import React, { useState } from "react";

export default function BridgeUIComponent() {
  const [btcAddress, setBtcAddress] = useState("");
  const [status, setStatus] = useState("");

  const submitBridge = async () => {
    setStatus("⏳ Submitting address to backend...");
    try {
      const res = await fetch("http://localhost:3001/bridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ btcAddress }),
      });
      const json = await res.json();
      setStatus(`✅ Watcher started for ${json.btcAddress}`);
    } catch (err) {
      setStatus("❌ Failed to connect bridge backend.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#1e293b", color: "#fff" }}>
      <h3>🔁 BTC → RBTC Bridge</h3>
      <input
        type="text"
        placeholder="Your BTC Address"
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
      />
      <button onClick={submitBridge} style={{ padding: "0.5rem 1rem" }}>
        🚀 Start Bridge
      </button>
      <p>{status}</p>
    </div>
  );
}
