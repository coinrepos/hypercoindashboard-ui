import React from "react";
import { APP_NAME, TOKEN_SYMBOL, TAX_TOKEN, BASE_RATE, INTAX_NAME } from "./config";

export default function TreasuryControls() {
  return (
    <div style={{ background: "#1e293b", padding: "1.5rem", marginTop: "2rem", borderRadius: "8px" }}>
      <h3>🏦 Treasury Controls</h3>
      <p>
        Manage liquidity, burn taxes, and set economic parameters for <strong>{APP_NAME}</strong>.
      </p>
      <ul style={{ paddingLeft: "1.2rem" }}>
        <li>📈 Base Rate: <strong>{BASE_RATE}</strong></li>
        <li>💰 Token: <strong>{TOKEN_SYMBOL}</strong></li>
        <li>🔥 Tax Token: <strong>{TAX_TOKEN} / {INTAX_NAME}</strong></li>
      </ul>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.5rem",
          background: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: "6px"
        }}
        onClick={() => alert("Burn executed (simulated)")}
      >
        🔥 Burn Reserve
      </button>
    </div>
  );
}
