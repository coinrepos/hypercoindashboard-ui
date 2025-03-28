import React, { useEffect, useState } from "react";

export default function GlobalToggle({ onModeChange, isAdmin }) {
  const [mode, setMode] = useState("Citizen");

  const toggleMode = () => {
    const newMode = mode === "Citizen" ? "Admin" : "Citizen";
    setMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  useEffect(() => {
    if (onModeChange) onModeChange(mode);
  }, []);

  return (
    <div style={{ marginTop: "1.5rem", background: "#334155", padding: "1rem", borderRadius: "6px" }}>
      <p>
        🧠 Mode: <strong>{mode}</strong>
      </p>
      {isAdmin && (
        <button
          onClick={toggleMode}
          style={{
            background: "#facc15",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            borderRadius: "4px",
            color: "#1e293b",
          }}
        >
          Toggle Mode
        </button>
      )}
    </div>
  );
}
