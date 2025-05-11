// src/components/DAOTab.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DAOTab() {
  const [proposals, setProposals] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    axios.get("/api/governance/proposals")
      .then((res) => {
        setProposals(res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to load proposals", err);
      });
  }, []);

  const vote = async (proposalId, vote) => {
    try {
      const res = await axios.post("/api/dao/vote", {
        proposalId,
        vote,
      });
      setStatusMsg(`🗳️ Voted on proposal ${proposalId}: ${vote}`);
    } catch (err) {
      console.error("❌ Vote failed", err);
    }
  };

  const createProposal = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post("/api/dao/proposals", {
        title: newTitle,
      });
      setStatusMsg(`📨 Proposal "${newTitle}" created`);
      setNewTitle("");
      setProposals((prev) => [
        ...prev,
        { id: prev.length + 1, title: newTitle },
      ]);
    } catch (err) {
      console.error("❌ Proposal creation failed", err);
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        background: "#1e293b",
        color: "#fff",
        borderRadius: "8px",
        margin: "2rem 0",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
        🗳 DAO Proposal Panel
      </h3>

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new proposal title"
          style={{
            padding: "0.5rem",
            marginRight: "0.5rem",
            borderRadius: "4px",
          }}
        />
        <button onClick={createProposal} style={{ padding: "0.5rem 1rem" }}>
          ➕ Submit Proposal
        </button>
      </div>

      {proposals.length > 0 ? (
        proposals.map((p) => (
          <div
            key={p.id}
            style={{
              marginBottom: "1rem",
              background: "#334155",
              padding: "0.75rem",
              borderRadius: "6px",
            }}
          >
            <strong>#{p.id}</strong> {p.title}
            <div style={{ marginTop: "0.5rem" }}>
              <button
                onClick={() => vote(p.id, "yes")}
                style={{ marginRight: "0.5rem", padding: "0.4rem 0.8rem" }}
              >
                ✅ Yes
              </button>
              <button onClick={() => vote(p.id, "no")} style={{ padding: "0.4rem 0.8rem" }}>
                ❌ No
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No proposals yet</p>
      )}

      {statusMsg && (
        <p style={{ color: "#4ade80", marginTop: "1rem" }}>{statusMsg}</p>
      )}
    </div>
  );
}
