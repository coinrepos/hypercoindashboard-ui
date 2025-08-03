import React, { useState } from "react";

export default function InsuranceUpload() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !reason || !file) {
      setStatus("❌ All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("reason", reason);
    formData.append("document", file);

    try {
      const res = await fetch("http://localhost:3001/insurance", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      setStatus(`✅ Submitted: ${json.message || "Insurance received."}`);
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("❌ Failed to upload insurance form.");
    }
  };

  return (
    <div style={{ background: "#1e293b", color: "#fff", padding: "1.5rem", borderRadius: "8px", marginTop: "2rem" }}>
      <h3>📄 Insurance Form (Required for DeFi)</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px" }}>
        <input
          type="text"
          placeholder="Your Name or Entity"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Reason / Insurance Details"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" style={{ padding: "0.5rem", background: "#22c55e", color: "#000", fontWeight: "bold" }}>
          🚀 Submit Insurance
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}
