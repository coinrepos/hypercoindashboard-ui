import React from "react";

export default function GlobalToggle({ onModeChange, isAdmin }) {
  return (
    <div>
      <button onClick={() => onModeChange("ON")}>Global ON</button>
      <button onClick={() => onModeChange("OFF")}>Global OFF</button>
      <p>Admin Access: {isAdmin ? "✅" : "❌"}</p>
    </div>
  );
}
