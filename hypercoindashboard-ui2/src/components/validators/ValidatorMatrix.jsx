import React, { useEffect, useState } from "react";

export default function ValidatorMatrix() {
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    // Simulated validator feed
    const loadValidators = () => {
      setValidators([
        {
          address: "0xA1b2...c3D4",
          hypeEarned: 12000,
          rbtcFees: 0.0421,
          blocks: 151,
          uptime: "99.2%",
          score: 9.3,
        },
        {
          address: "0xF5e6...aB91",
          hypeEarned: 9800,
          rbtcFees: 0.0317,
          blocks: 122,
          uptime: "97.8%",
          score: 8.6,
        },
        {
          address: "0xC3D5...7E22",
          hypeEarned: 14000,
          rbtcFees: 0.0652,
          blocks: 176,
          uptime: "99.7%",
          score: 9.8,
        },
      ]);
    };

    loadValidators();
  }, []);

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#0f172a", color: "#fff", marginTop: "2rem", borderRadius: "8px" }}>
      <h2>🔐 Validator Performance Matrix</h2>

      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse", color: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#1e293b" }}>
            <th style={thStyle}>Validator</th>
            <th style={thStyle}>HYPE Earned</th>
            <th style={thStyle}>RBTC Fees</th>
            <th style={thStyle}>Blocks</th>
            <th style={thStyle}>Uptime</th>
            <th style={thStyle}>DAO Score</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((v, i) => (
            <tr key={i} style={{ textAlign: "center", backgroundColor: i % 2 === 0 ? "#0f172a" : "#1e293b" }}>
              <td style={tdStyle}>{v.address}</td>
              <td style={tdStyle}>{v.hypeEarned.toLocaleString()} HYPE</td>
              <td style={tdStyle}>{v.rbtcFees} RBTC</td>
              <td style={tdStyle}>{v.blocks}</td>
              <td style={tdStyle}>{v.uptime}</td>
              <td style={tdStyle}>{v.score}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #334155",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #334155",
};
