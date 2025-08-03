import React, { useState, useEffect } from "react";

export default function MyPortfolio({ wallet }) {
  const [portfolio, setPortfolio] = useState([]);
  const [hypeBalance, setHypeBalance] = useState(0);
  const [rbtcBalance, setRBTCBalance] = useState(0);

  useEffect(() => {
    if (!wallet) return;

    // Simulated portfolio fetch
    const simulatedPortfolio = [
      {
        symbol: "HOUSE99",
        type: "Real Estate",
        value: 14000,
        timestamp: "2025-03-26 13:00",
      },
      {
        symbol: "EBOOK1",
        type: "Digital Book",
        value: 500,
        timestamp: "2025-03-25 19:30",
      },
    ];

    setPortfolio(simulatedPortfolio);
    setHypeBalance(19200);
    setRBTCBalance(0.0023);
  }, [wallet]);

  return (
    <div style={{ backgroundColor: "#0f172a", padding: "2rem", borderRadius: "8px", color: "#fff", marginTop: "2rem" }}>
      <h2>📊 My Portfolio</h2>

      <div style={cardStyle}>
        <p><strong>RBTC:</strong> {rbtcBalance} RBTC</p>
        <p><strong>HYPE:</strong> {hypeBalance.toLocaleString()} HYPE</p>
      </div>

      <h3 style={{ marginTop: "2rem" }}>🪙 Owned StockCoins</h3>

      {portfolio.length === 0 ? (
        <p>No assets yet.</p>
      ) : (
        portfolio.map((item, i) => (
          <div key={i} style={cardStyle}>
            <p><strong>{item.symbol}</strong> — {item.type}</p>
            <p><strong>Value:</strong> {item.value} HYPE</p>
            <p><strong>Minted:</strong> {item.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1e293b",
  padding: "1rem",
  marginTop: "1rem",
  borderRadius: "6px",
};
