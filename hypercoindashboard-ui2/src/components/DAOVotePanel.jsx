import { useState } from "react";

export default function DAOVotePanel() {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Allow SDSIS Access for East Rhenland",
      description: "Approve entry into debt pool with capped 3-year term.",
      votesYes: 92,
      votesNo: 8,
      hasVoted: false,
    },
    {
      id: 2,
      title: "Lease DAO-Controlled Port Facility (Azura)",
      description: "Proposal to lease infrastructure for 24 months to generate DAO revenue.",
      votesYes: 47,
      votesNo: 21,
      hasVoted: false,
    },
  ]);

  const [newProposal, setNewProposal] = useState({ title: "", description: "" });
  const [status, setStatus] = useState("");

  const vote = (id, type) => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === id && !p.hasVoted) {
          return {
            ...p,
            votesYes: type === "yes" ? p.votesYes + 1 : p.votesYes,
            votesNo: type === "no" ? p.votesNo + 1 : p.votesNo,
            hasVoted: true,
          };
        }
        return p;
      })
    );
    setStatus("🗳️ Vote cast. Thank you for participating.");
  };

  const submitProposal = () => {
    if (!newProposal.title || !newProposal.description) {
      return setStatus("❌ Please enter title and description.");
    }

    const nextId = proposals.length + 1;
    setProposals([
      ...proposals,
      { id: nextId, title: newProposal.title, description: newProposal.description, votesYes: 0, votesNo: 0, hasVoted: false },
    ]);
    setNewProposal({ title: "", description: "" });
    setStatus("✅ Proposal submitted for DAO review.");
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🧑‍⚖️ HyperDAO Voting Console</h2>
      <p style={descStyle}>Submit new proposals or vote on active ones. All wallets = 1 vote.</p>

      <div style={formBlock}>
        <input
          style={inputStyle}
          placeholder="Proposal Title"
          value={newProposal.title}
          onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
        />
        <textarea
          style={inputStyle}
          placeholder="Describe the policy change or proposal..."
          value={newProposal.description}
          onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
          rows={4}
        />
        <button onClick={submitProposal} style={btnStyle}>Submit Proposal</button>
      </div>

      <hr style={{ borderColor: "#333", margin: "2rem 0" }} />

      <h4>📋 Active Proposals</h4>
      {proposals.map((p) => (
        <div key={p.id} style={voteCard}>
          <h5>{p.title}</h5>
          <p>{p.description}</p>
          <p>
            ✅ {p.votesYes} | ❌ {p.votesNo}
          </p>
          {!p.hasVoted ? (
            <>
              <button onClick={() => vote(p.id, "yes")} style={btnYes}>Vote Yes</button>
              <button onClick={() => vote(p.id, "no")} style={btnNo}>Vote No</button>
            </>
          ) : (
            <p style={{ color: "#facc15" }}>🗳️ You already voted on this proposal.</p>
          )}
        </div>
      ))}

      {status && <p style={{ color: "#4ade80", marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

const panelStyle = {
  backgroundColor: "#1a1a1a",
  color: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  marginTop: "2rem",
};

const titleStyle = {
  fontSize: "1.5rem",
};

const descStyle = {
  color: "#888",
  margin: "1rem 0 2rem 0",
};

const formBlock = {
  marginBottom: "2rem",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#222",
  border: "1px solid #333",
  color: "#fff",
  borderRadius: "6px",
  marginBottom: "1rem",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const voteCard = {
  backgroundColor: "#0f172a",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1.5rem",
};

const btnYes = {
  ...btnStyle,
  backgroundColor: "#22c55e",
  marginRight: "0.5rem",
};

const btnNo = {
  ...btnStyle,
  backgroundColor: "#dc2626",
};
