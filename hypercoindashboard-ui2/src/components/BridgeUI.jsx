// src/BridgeUI.jsx
import React, { useState } from "react";

export default function BridgeUI() {
  const [btcAddress, setBtcAddress] = useState("");
  const [status, setStatus] = useState("");

  const submitBridge = async () => {
    setStatus("⏳ Submitting your BTC address to the watcher...");
    try {
      const res = await fetch("/api/bridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ btcAddress }),
      });

      const json = await res.json();
      setStatus(`✅ Watcher activated for ${json.btcAddress}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Could not connect to bridge service.");
    }
  };

  return (
    <div style={wrapper}>
      <h3 style={heading}>🔁 BTC ➞ RBTC Bridge</h3>
      <input
        type="text"
        placeholder="Your BTC Address"
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
        style={input}
      />
      <button onClick={submitBridge} style={button}>🚀 Start Bridge</button>
      <p style={statusStyle}>{status}</p>
    </div>
  );
}

// 💄 Styles
const wrapper = {
  backgroundColor: "#1e293b",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  marginTop: "2rem"
};

const heading = {
  fontSize: "1.5rem",
  marginBottom: "1rem"
};

const input = {
  padding: "0.6rem",
  width: "60%",
  borderRadius: "6px",
  border: "1px solid #334155",
  marginRight: "1rem"
};

const button = {
  padding: "0.6rem 1rem",
  backgroundColor: "#10b981",
  color: "#000",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px"
};

const statusStyle = {
  marginTop: "1rem",
  color: "#e2e8f0"
};
