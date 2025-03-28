// src/BridgeUI.jsx
import React, { useState } from "react";
import BridgeUI from "./BridgeUI";

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
    <div style={{ background: "#1e293b", padding: "1.5rem", marginTop: "2rem", borderRadius: "8px" }}>
      <h3>🔁 BTC → RBTC Bridge</h3>
      <input
        type="text"
        placeholder="Your BTC Address"
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
      />
      <button onClick={submitBridge} style={{ padding: "0.5rem 1.5rem", background: "#22c55e" }}>
        🚀 Start Bridge
      </button>
      <p>{status}</p>
	  <BridgeUI />
    </div>
  );
}
