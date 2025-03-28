import React, { useEffect, useState } from "react";

export default function LiveFeedPanel() {
  const [feed, setFeed] = useState([]);
  const [ticker, setTicker] = useState("📉 Loading StockCoin Ticker...");

  useEffect(() => {
    const mockTicker = [
      "🔼 STOCK: +3.4% | 14.2 HYPE",
      "🔻 STOCK: -1.1% | 13.7 HYPE",
      "🔼 STOCK: +4.7% | 15.3 HYPE",
      "🔄 STOCK: 0.0% | 14.9 HYPE"
    ];

    const systemFeed = [
      "🧠 Validator 0x9aE... earned 3.4 HYPE",
      "💸 Swap: 2.5 HYPE → INTAX",
      "🏦 Treasury moved 10 RBTC to SDSIS",
      "🗳️ DAO vote passed: Mint cap increased"
    ];

    let i = 0;
    const tickerInterval = setInterval(() => {
      setTicker(mockTicker[i % mockTicker.length]);
      i++;
    }, 3000);

    setFeed(systemFeed);

    return () => clearInterval(tickerInterval);
  }, []);

  return (
    <div
      style={{
        background: "#1e293b",
        color: "#f8fafc",
        padding: "1rem",
        borderRadius: "8px",
        marginTop: "2rem",
        maxWidth: "480px"
      }}
    >
      <h3>📡 Live System Feed</h3>
      <div
        style={{
          background: "#0f172a",
          padding: "0.5rem",
          marginBottom: "1rem",
          border: "1px solid #334155",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        {ticker}
      </div>
      <ul style={{ paddingLeft: "1.2rem" }}>
        {feed.map((entry, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
