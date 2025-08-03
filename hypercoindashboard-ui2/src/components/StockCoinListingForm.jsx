import React, { useState } from "react";

export default function StockCoinListingForm({ onNewListing }) {
  const [form, setForm] = useState({
    symbol: "",
    assetType: "",
    price: "",
    owner: "",
    description: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { symbol, assetType, price, owner } = form;
    if (!symbol || !assetType || !price || !owner) {
      setStatus("⚠️ Please fill in all required fields.");
      return;
    }

    const newAsset = {
      id: Date.now(),
      ...form,
    };

    onNewListing(newAsset);
    setStatus(`✅ ${symbol} listed successfully.`);
    setForm({ symbol: "", assetType: "", price: "", owner: "", description: "" });
  };

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#1e293b", color: "#fff", borderRadius: "8px", marginTop: "2rem" }}>
      <h3>📄 List New StockCoin</h3>

      <input
        type="text"
        name="symbol"
        placeholder="Ticker Symbol (e.g., VILLA99)"
        value={form.symbol}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="assetType"
        placeholder="Asset Type (Real Estate, Art, etc)"
        value={form.assetType}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="price"
        placeholder="Price in HYPE"
        value={form.price}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="owner"
        placeholder="Owner Wallet Address"
        value={form.owner}
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="description"
        placeholder="Optional description / metadata"
        value={form.description}
        onChange={handleChange}
        style={{ ...inputStyle, height: "80px" }}
      />

      <button onClick={handleSubmit} style={buttonStyle}>📤 List StockCoin</button>

      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "0.5rem",
  backgroundColor: "#0f172a",
  color: "#fff",
  border: "1px solid #334155",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#22c55e",
  color: "#000",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
};
