// src/BridgeUI.jsx
import React, { useState } from "react";

export default function BridgeUI() {
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
    <div>
      <h3>🔁 BTC → RBTC Bridge</h3>
      <input
        type="text"
        placeholder="Your BTC Address"
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
      />
      <button onClick={submitBridge}>🚀 Start Bridge</button>
      <p>{status}</p>
    </div>
  );
}
