import React, { useState } from "react";

export default function DAOVoting() {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");
  const [votes, setVotes] = useState({});
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const createProposal = () => {
    if (!newProposal.trim()) return;
    const proposal = {
      id: Date.now(),
      text: newProposal,
      yes: 0,
      no: 0,
      voters: []
    };
    setProposals([proposal, ...proposals]);
    setNewProposal("");
  };

  const vote = (id, type) => {
    if (!address.trim()) return setStatus("⚠️ Enter wallet address to vote.");

    const updated = proposals.map((p) => {
      if (p.id === id) {
        if (p.voters.includes(address)) {
          setStatus("❌ You have already voted.");
          return p;
        }
        const updatedP = { ...p };
        updatedP[type]++;
        updatedP.voters.push(address);
        setStatus("✅ Vote cast.");
        return updatedP;
      }
      return p;
    });
    setProposals(updated);
  };

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#0f172a", color: "#fff", marginTop: "2rem", borderRadius: "8px" }}>
      <h2>🗳️ DAO Voting Panel</h2>

      <input
        type="text"
        placeholder="Enter your wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "1rem" }}
      />

      <input
        type="text"
        placeholder="New proposal..."
        value={newProposal}
        onChange={(e) => setNewProposal(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "0.5rem" }}
      />
      <button
        onClick={createProposal}
        style={{
          backgroundColor: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "10px 16px",
          fontWeight: "bold"
        }}
      >
        Submit Proposal
      </button>

      <p style={{ marginTop: "0.5rem" }}>{status}</p>

      {proposals.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>📋 Active Proposals</h4>
          {proposals.map((p) => (
            <div key={p.id} style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#1e293b", borderRadius: "6px" }}>
              <p><strong>🧾 {p.text}</strong></p>
              <p>✅ Yes: {p.yes} | ❌ No: {p.no}</p>
              <button
                onClick={() => vote(p.id, "yes")}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#22c55e",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px"
                }}
              >
                Vote Yes
              </button>
              <button
                onClick={() => vote(p.id, "no")}
                style={{
                  backgroundColor: "#ef4444",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px"
                }}
              >
                Vote No
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
