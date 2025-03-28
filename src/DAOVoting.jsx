import React, { useEffect, useState } from "react";

export default function DAOVoting() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // 🧪 Mocked data – Replace with fetch from contract or subgraph
    const mockProposals = [
      { id: 1, title: "Mint 1M HYPE", votesFor: 312, votesAgainst: 29 },
      { id: 2, title: "Enable RBTC Bridge", votesFor: 198, votesAgainst: 56 },
    ];
    setProposals(mockProposals);
  }, []);

  return (
    <div style={{ marginTop: "2rem", background: "#1f2937", padding: "1.5rem", borderRadius: "8px" }}>
      <h3>🗳️ DAO Voting</h3>
      {proposals.length === 0 ? (
        <p>Loading proposals...</p>
      ) : (
        <ul>
          {proposals.map((p) => (
            <li key={p.id} style={{ marginBottom: "1rem" }}>
              <strong>{p.title}</strong><br />
              ✅ For: {p.votesFor} | ❌ Against: {p.votesAgainst}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
