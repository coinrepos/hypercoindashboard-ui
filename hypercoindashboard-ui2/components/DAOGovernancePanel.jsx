import React, { useState } from "react";

const DAOGovernancePanel = () => {
  const [taskType, setTaskType] = useState("");
  const [proposal, setProposal] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/queueTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: taskType, payload: { proposal } }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Proposal submitted to queue");
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to submit task");
    }
  };

  return (
    <div className="dao-panel">
      <h2>🗳️ Submit DAO Task</h2>
      <label>Task Type (e.g., daoProposal, setRate)</label>
      <input
        type="text"
        value={taskType}
        onChange={(e) => setTaskType(e.target.value)}
      />
      <label>Proposal Description or Data</label>
      <textarea
        rows="4"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
      />
      <button onClick={handleSubmit}>📨 Submit to DAO Queue</button>
      <p>{status}</p>
    </div>
  );
};

export default DAOGovernancePanel;
