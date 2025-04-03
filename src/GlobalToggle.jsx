import React, { useEffect } from "react";

export default function GlobalToggle({ mode, onModeChange, isAdmin }) {
  useEffect(() => {
    console.log("?? Mode changed:", mode);
    // Future logic can be added here
  }, [mode, onModeChange]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      {isAdmin && (
        <button
          onClick={() => onModeChange(mode === "admin" ? "user" : "admin")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          ?? Switch Mode
        </button>
      )}
    </div>
  );
}
