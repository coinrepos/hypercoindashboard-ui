// src/NoWalletAlert.jsx
import React from "react";

export default function NoWalletAlert() {
  return (
    <div style={{ backgroundColor: "#f87171", color: "#1e293b", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", fontWeight: "bold" }}>
      🚫 MetaMask not detected. Please install the extension to continue using {`HyperOS`}.
      <br />
      👉 <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Get MetaMask</a>
    </div>
  );
}

