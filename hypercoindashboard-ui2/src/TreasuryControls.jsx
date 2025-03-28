// src/TreasuryControls.jsx
import React from "react";
import {
  APP_NAME,
  TOKEN_SYMBOL,
  INTAX_NAME,
  ORGANIZATION_NAME
} from "./config";

export default function TreasuryControls() {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "1.5rem",
        borderRadius: "10px",
        color: "#f8fafc",
        maxWidth: "600px",
        marginTop: "2rem",
      }}
    >
      <h2>🏦 {APP_NAME} Treasury Controls</h2>
      <p>
        Welcome, <strong>{ORGANIZATION_NAME}</strong>. You may perform treasury operations,
        apply taxes, manage staking rewards, and oversee {INTAX_NAME} policy.
      </p>

      <ul style={{ marginTop: "1rem" }}>
        <li>🧾 View Total {TOKEN_SYMBOL} Supply</li>
        <li>💸 Adjust {INTAX_NAME} Burn Thresholds</li>
        <li>🔐 Lock/Unlock Treasury Contracts</li>
        <li>📈 Set Inflation Reward %</li>
      </ul>

      <div style={{ marginTop: "1.5rem" }}>
        <button style={styles.button}>Issue {TOKEN_SYMBOL}</button>
        <button style={styles.button}>Burn {INTAX_NAME}</button>
        <button style={styles.button}>Stake Allocations</button>
      </div>
    </div>
  );
}

const styles = {
  button: {
    marginRight: "1rem",
    marginTop: "1rem",
    padding: "10px 14px",
    borderRadius: "6px",
    backgroundColor: "#22d3ee",
    color: "#0f172a",
    fontWeight: "bold",
    border: "none",
  },
};
