// src/LiveFeedPanel.jsx
import React, { useEffect, useState } from "react";

export default function LiveFeedPanel() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const mockData = [
      "🧠 Validator 0x9aE... earned 3.4 HYPE",
      "💸 Swap: 2.5 HYPE → INTAX",
      "🏦 Treasury moved 10 RBTC to SDSIS",
      "🗳️ DAO vote passed: Mint cap increased"
    ];
    setFeed(mockData);
  }, []);

  return (
    <div style={{
      background: "#1e293b",
      color: "#f8fafc",
      padding: "1rem",
      borderRadius: "8px",
      marginTop: "2rem",
      maxWidth: "480px"
    }}>
      <h3>📡 Live System Feed</h3>
      <ul style={{ paddingLeft: "1.2rem" }}>
        {feed.map((entry, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
