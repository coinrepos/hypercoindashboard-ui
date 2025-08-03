// src/DAOVoting.jsx

import React, { useEffect, useState } from "react";
import { fetchProposals, submitVote } from "./services/DAOService.js";
import { useHyperBot } from "./HyperBotContext.jsx";

export default function DAOVoting() {
  const [proposals, setProposals] = useState([]);
  const [status, setStatus] = useState("🗳 Fetching proposals...");
  const { dispatch } = useHyperBot();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProposals();
        setProposals(data);
        setStatus("✅ DAO Proposals loaded");
      } catch (err) {
        console.error(err);
        setStatus("❌ Failed to load proposals");
      }
    };
    load();
  }, []);

  const vote = async (id) => {
    try {
      await submitVote(id);
      setStatus(`✅ Vote submitted on #${id}`);
      dispatch({
        type: "EXECUTE_TASK",
        payload: { name: "NOTIFY_DAO_PROPOSAL", data: `Voted on proposal #${id}` },
      });
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to vote on #${id}`);
    }
  };

  return (
    <div style={{ padding: "2rem", background: "#0f172a", color: "#fff" }}>
      <h2>🗳 DAO Voting Panel</h2>
      <p>{status}</p>
      {proposals.length === 0 && <p>No proposals found.</p>}
      <ul>
        {proposals.map((p, i) => (
          <li key={i} style={{ marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "1rem" }}>
            <strong>#{p.id}</strong>: {p.title}
            <br />
            <button
              style={{ background: "#22c55e", padding: "6px 10px", marginTop: "0.5rem" }}
              onClick={() => vote(p.id)}
            >
              ✅ Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
