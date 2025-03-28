// src/GlobalToggle.jsx
import React, { useState, useEffect } from "react";

export default function GlobalToggle({ onModeChange, isAdmin }) {
  const [isDecentralized, setIsDecentralized] = useState(false);

  useEffect(() => {
    if (onModeChange) {
      onModeChange(isDecentralized ? "decentralized" : "centralized");
    }
  }, [isDecentralized]);

  return (
    <div style={{
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      padding: "1rem",
      borderRadius: "8px",
      marginTop: "2rem"
    }}>
      <h3>🌐 Network Mode Toggle</h3>
      <p>
        {isDecentralized
          ? "🛰️ Decentralized Mode Active"
          : "🏛️ Centralized Governance Enabled"}
      </p>
      <button
        onClick={() => setIsDecentralized(!isDecentralized)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#22c55e",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginTop: "0.5rem"
        }}
      >
        Toggle Mode
      </button>

      {isAdmin && (
        <div style={{
          marginTop: "1.5rem",
          backgroundColor: "#0f172a",
          padding: "1rem",
          borderRadius: "6px"
        }}>
          <h4>📡 IPFS System (Admin Only)</h4>
          <p>Connected to secure decentralized storage.</p>
          <button
            style={{
              backgroundColor: "#3b82f6",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            🔄 Connect IPFS Node
          </button>
        </div>
      )}
    </div>
  );
}
