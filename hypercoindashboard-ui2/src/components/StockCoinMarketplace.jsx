import React, { useState, useEffect } from "react";
import StockCoinListingForm from "./StockCoinListingForm";

export default function StockCoinMarketplace() {
  const [allAssets, setAllAssets] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setAllAssets([
      {
        id: 1,
        type: "Real Estate",
        name: "🏡 BrickVilla",
        symbol: "BRICKV",
        price: 15000,
        owner: "0x123...AbC",
      },
      {
        id: 2,
        type: "Digital Book",
        name: "📘 Crypto Economics 101",
        symbol: "CE101",
        price: 300,
        owner: "0x456...EfG",
      },
      {
        id: 3,
        type: "Business",
        name: "🏪 SnackChain Franchise",
        symbol: "SNACKX",
        price: 5400,
        owner: "0x789...XYZ",
      },
    ]);
  }, []);

  const filteredAssets = allAssets.filter((a) => {
    return filter === "All" || a.type === filter;
  });

  const handleBuy = (symbol) => {
    alert(`✅ You’ve bought ${symbol}!\nThis would trigger a smart contract interaction in production.`);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", color: "#fff", marginTop: "2rem", borderRadius: "8px" }}>
      <h2>🛒 StockCoin Marketplace</h2>

      <StockCoinListingForm onNewListing={(asset) => setAllAssets([asset, ...allAssets])} />

      <div style={{ marginBottom: "1rem", marginTop: "2rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Filter by type:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={selectStyle}>
          <option value="All">All</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Digital Book">Digital Book</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {filteredAssets.map((asset) => (
        <div key={asset.id} style={cardStyle}>
          <h4>{asset.name || asset.symbol} ({asset.symbol})</h4>
          <p><strong>Type:</strong> {asset.type || asset.assetType}</p>
          <p><strong>Price:</strong> {asset.price} HYPE</p>
          <p><strong>Owner:</strong> {asset.owner}</p>
          {asset.description && <p><strong>Desc:</strong> {asset.description}</p>}
          <button onClick={() => handleBuy(asset.symbol)} style={buyButton}>
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1e293b",
  padding: "1rem",
  borderRadius: "6px",
  marginBottom: "1rem",
};

const selectStyle = {
  padding: "8px",
  backgroundColor: "#1e293b",
  color: "#fff",
  borderRadius: "6px",
  border: "1px solid #334155",
};

const buyButton = {
  marginTop: "0.5rem",
  padding: "10px 16px",
  backgroundColor: "#22c55e",
  color: "#000",
  fontWeight: "bold",
  border: "none",
  borderRadius: "4px",
};
