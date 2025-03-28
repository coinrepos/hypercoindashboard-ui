// src/DAOUpgradeEngine.jsx
import React, { useState } from "react";

export default function DAOUpgradeEngine() {
  const [proposal, setProposal] = useState("");
  const [description, setDescription] = useState("");
  const [upgradeLog, setUpgradeLog] = useState([]);

  const submitUpgrade = () => {
    if (!proposal.trim()) return;
    const newUpgrade = {
      title: proposal,
      desc: description,
      status: "🟡 Pending",
      date: new Date().toLocaleString()
    };
    setUpgradeLog([newUpgrade, ...upgradeLog]);
    setProposal("");
    setDescription("");
  };

  return (
    <div style={{ background: "#0f172a", color: "#fff", padding: "2rem", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "1rem" }}>🧠 DAO Upgrade Engine</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Propose changes to network-level economic policies, validator rules, or minting parameters.
      </p>

      <input
        type="text"
        placeholder="Proposal Title"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Describe your proposal..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: "100px" }}
      />

      <button onClick={submitUpgrade} style={buttonStyle}>
        Submit Proposal
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h3>📜 Proposal Log</h3>
        {upgradeLog.length === 0 && <p>No proposals submitted yet.</p>}
        {upgradeLog.map((entry, idx) => (
          <div key={idx} style={logStyle}>
            <strong>{entry.title}</strong> — {entry.desc}
            <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>{entry.status} · {entry.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "1rem",
  borderRadius: "6px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#fff"
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#22c55e",
  color: "#000",
  fontWeight: "bold",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const logStyle = {
  padding: "1rem",
  backgroundColor: "#1e293b",
  borderRadius: "6px",
  marginBottom: "1rem"
};
