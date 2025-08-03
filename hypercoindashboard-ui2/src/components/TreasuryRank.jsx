import { useState } from "react";

export default function TreasuryRank() {
  const [nations] = useState([
    {
      name: "Azura",
      debt: 7400000,
      repaid: 6350000,
      intaxBurned: 152340,
    },
    {
      name: "East Rhenland",
      debt: 8800000,
      repaid: 2880000,
      intaxBurned: 98760,
    },
    {
      name: "Nubaria",
      debt: 3500000,
      repaid: 1900000,
      intaxBurned: 71240,
    },
  ]);

  const sorted = [...nations].sort((a, b) => {
    const aScore = a.repaid / a.debt;
    const bScore = b.repaid / b.debt;
    return bScore - aScore;
  });

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🏅 Treasury Leaderboard</h2>
      <p style={subText}>Ranked by debt repayment %, InTax burn contribution, and fiscal performance.</p>

      <ol style={{ marginTop: "1rem" }}>
        {sorted.map((nation, i) => {
          const percent = ((nation.repaid / nation.debt) * 100).toFixed(1);
          return (
            <li key={i} style={listStyle}>
              <span style={rankIcon}>{i === 0 ? "👑" : `#${i + 1}`}</span>
              <strong>{nation.name}</strong> — 
              <span style={{ color: percent >= 80 ? "#4ade80" : percent >= 50 ? "#facc15" : "#f87171" }}>
                {percent}% repaid
              </span> | 🔥 {nation.intaxBurned.toLocaleString()} INX burned
            </li>
          );
        })}
      </ol>

      <p style={footerStyle}>🧠 Powered by HyperCoin Treasury Intelligence Grid</p>
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

const subText = {
  color: "#ccc",
  marginTop: "0.5rem",
  marginBottom: "1.5rem",
};

const listStyle = {
  fontSize: "1rem",
  marginBottom: "0.75rem",
};

const rankIcon = {
  display: "inline-block",
  width: "2.5rem",
};

const footerStyle = {
  marginTop: "2rem",
  fontSize: "0.85rem",
  color: "#888",
};
