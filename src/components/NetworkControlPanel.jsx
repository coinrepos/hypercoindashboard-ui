// src/components/NetworkControlPanel.jsx
import React, { useState } from "react";
import { useHyperBot } from "./HyperBotContext";

export default function NetworkControlPanel() {
  const { dispatch } = useHyperBot();
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", background: "#111", color: "#0f0", borderRadius: "8px" }}>
      <button
        onClick={() => setVisible(!visible)}
        style={{
          padding: "0.4rem 1rem",
          backgroundColor: "#1e293b",
          color: "#fff",
          fontSize: "0.85rem",
          marginBottom: "1rem",
        }}
      >
        {visible ? "🛑 Hide Emergency Controls" : "⚠️ Admin: Show Emergency Panel"}
      </button>

      {visible && (
        <>
          <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "1rem" }}>
            ⚠️ <strong>Warning:</strong> These controls trigger global mesh events. Use only if you're an authorized HyperAdmin.
          </p>

          <button
            style={{ backgroundColor: "#dc2626", color: "#fff", padding: "0.5rem 1.2rem", marginRight: "1rem" }}
            onClick={() =>
              dispatch({
                type: "EXECUTE_TASK",
                payload: { name: "TRIGGER_RECALL_PROTOCOL" },
              })
            }
          >
            🚨 Freeze Network
          </button>

          <button
            style={{ backgroundColor: "#16a34a", color: "#fff", padding: "0.5rem 1.2rem" }}
            onClick={() =>
              dispatch({
                type: "EXECUTE_TASK",
                payload: { name: "RESUME_NETWORK" },
              })
            }
          >
            ✅ Resume Network
          </button>
        </>
      )}
    </div>
  );
}