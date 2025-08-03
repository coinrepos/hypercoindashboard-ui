// src/LiveFeedPanel.jsx

import React, { useEffect, useState } from "react";
import { useHyperBot } from "./HyperBotContext.jsx";

export default function LiveFeedPanel() {
  const { messages, isOnline } = useHyperBot();
  const [visible, setVisible] = useState(true);

  return (
    <div style={{
      background: "#0d1117",
      color: "#c9d1d9",
      padding: "1rem",
      borderRadius: "8px",
      marginTop: "2rem",
      maxHeight: visible ? "300px" : "40px",
      overflowY: "auto",
      fontSize: "0.85rem",
      transition: "max-height 0.3s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>📡 HyperBot Live Feed {isOnline ? "🟢" : "🔴"}</strong>
        <button onClick={() => setVisible(!visible)} style={{ background: "none", border: "none", color: "#58a6ff" }}>
          {visible ? "Collapse" : "Expand"}
        </button>
      </div>
      {visible && (
        <ul style={{ marginTop: "0.5rem", listStyle: "none", paddingLeft: 0 }}>
          {messages.map((msg, index) => (
            <li key={index} style={{ paddingBottom: "0.25rem" }}>→ {msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
