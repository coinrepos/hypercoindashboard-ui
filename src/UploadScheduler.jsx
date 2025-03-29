// src/UploadScheduler.jsx
import React, { useState } from "react";

export default function UploadScheduler() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const submitUpload = async () => {
    if (!file || !date) return setStatus("❌ Please select file and schedule date.");
    setStatus("⏳ Scheduling upload...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("date", date);

      const res = await fetch("http://localhost:3001/upload-schedule", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      setStatus(`✅ Scheduled for ${json.date}, mirror ID: ${json.mirrorId}`);
    } catch (err) {
      console.error("Upload failed", err);
      setStatus("❌ Upload scheduling failed.");
    }
  };

  return (
    <div style={{ background: "#1e293b", padding: "1.5rem", marginTop: "2rem", borderRadius: "8px" }}>
      <h3>🗓️ Upload Scheduler (Manual + Mirror)</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginLeft: "1rem" }}
      />
      <button onClick={submitUpload} style={{ marginLeft: "1rem", background: "#22c55e", padding: "0.5rem 1rem" }}>
        Schedule Upload
      </button>
      <p>{status}</p>
    </div>
  );
}
