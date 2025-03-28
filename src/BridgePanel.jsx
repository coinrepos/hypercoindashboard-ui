// 📁 C:\Projects\hypercoindashboard-ui\src\BridgePanel.jsx
import React from "react";

export default function BridgePanel() {
  return (
    <div style={{ backgroundColor: "#1e293b", color: "#f8fafc", padding: "1.5rem", borderRadius: "8px", marginTop: "2rem" }}>
      <h3>🔗 BTC ➜ RBTC Bridge</h3>
      <p>Send Bitcoin to:</p>
      <p style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#4ade80" }}>
        Bsqtd7MFe17iuFHNi4ewlXt0TXWGMKly
      </p>
      <p>⏳ Your RBTC will be minted automatically after confirmations.</p>
      <small>Powered by HyperBridge + Blockstream</small>
    </div>
  );
}
