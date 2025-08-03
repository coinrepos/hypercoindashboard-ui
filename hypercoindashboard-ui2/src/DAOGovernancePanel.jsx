// File: C:\Projects\hypercoindashboard-ui\hypercoindashboard-ui2\src\components\DAOGovernancePanel.jsx

import React, { useState } from "react";

const DAOGovernancePanel = () => {
  const [proposal, setProposal] = useState("");
  const [status, setStatus] = useState("");

  const submitProposal = async () => {
    try {
      const res = await fetch("/api/queue/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "daoVote",
          payload: { proposal }
        }),
      });
      const data = await res.json();
      setStatus("✅ Proposal submitted to queue.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to submit proposal.");
    }
  };

  return (
    <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", color: "#f1f5f9" }}>
      <h2>🗳 DAO Governance Panel</h2>
      <textarea
        placeholder="Enter your governance proposal"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <button onClick={submitProposal}>Submit Proposal</button>
      <p>{status}</p>
    </div>
  );
};

export default DAOGovernancePanel;
