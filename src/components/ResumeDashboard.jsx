import React from "react";
import { useHyperBot } from "./HyperBotContext";

export default function ResumeDashboard() {
  const { isFrozen, dispatch } = useHyperBot();

  return (
    <div style={{ padding: "2rem", background: "#1e293b", color: "#fff" }}>
      <h2>🧠 Network Security Panel</h2>
      <p>Status: {isFrozen ? "🧊 Frozen" : "🟢 Online"}</p>

      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#22c55e",
          border: "none",
          borderRadius: "6px",
          marginTop: "1rem",
          fontWeight: "bold",
        }}
        onClick={() =>
          dispatch({
            type: "EXECUTE_TASK",
            payload: { name: "UNFREEZE_PROTOCOL" },
          })
        }
      >
        Resume Network
      </button>
    </div>
  );
}
