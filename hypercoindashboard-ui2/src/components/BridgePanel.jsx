import React from "react";

const BTC_ADDRESS = "bc1q5lnjr4y2lfyee9gt9gfchcswcd8xg4zyjdmfknvqtjfcxcyxwhzqf4gjmt"; // 🧬 Replace with actual BTC address

export default function BridgePanel() {
  return (
    <div style={{ backgroundColor: "#1e293b", color: "#f8fafc", padding: "1.5rem", borderRadius: "8px", marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>🔗 BTC ➜ RBTC Bridge</h3>
      
      <p>Send your BTC to this address:</p>
      <p style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#4ade80", wordBreak: "break-all" }}>
        {BTC_ADDRESS}
      </p>

      <p style={{ marginTop: "1rem" }}>
        ⏳ Your RBTC will be minted automatically after the transaction receives sufficient confirmations on the Bitcoin blockchain.
      </p>

      <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "1rem" }}>
        🔒 Powered by HyperBridge™ + Blockstream API
      </p>
    </div>
  );
}
