import React from "react";

const ProcessQueueButton = ({ onClick, disabled = false, loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="process-queue-btn"
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        border: "none",
        borderRadius: "5px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {loading ? "⏳ Processing..." : "🚀 Process Queue"}
    </button>
  );
};

export default ProcessQueueButton;
