// src/ValidatorRank.jsx
import React, { useEffect, useState } from "react";

export default function ValidatorRank() {
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    // 🔧 Replace this with actual fetch from backend / smart contract later
    const mockValidators = [
      { address: "0xF31A...4Bc", score: 95, earnings: 32.5 },
      { address: "0xC99D...1Ee", score: 88, earnings: 27.3 },
      { address: "0xD12B...78A", score: 76, earnings: 21.9 },
      { address: "0xB83b...8835F", score: 100, earnings: 88.8, you: true },
    ];
    setValidators(mockValidators);
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>📊 Validator Matrix</h2>
      <p>Network-wide ranking of validator performance & profits.</p>
      <table style={{ width: "100%", marginTop: "1.5rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Score</th>
            <th style={thStyle}>Earnings (HYPE)</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((v, idx) => (
            <tr key={idx} style={{ backgroundColor: v.you ? "#16a34a" : "#1e293b" }}>
              <td style={tdStyle}>{idx + 1}</td>
              <td style={tdStyle}>{v.address}</td>
              <td style={tdStyle}>{v.score}</td>
              <td style={tdStyle}>{v.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #334155"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #334155"
};
