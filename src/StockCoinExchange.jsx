import React, { useEffect, useState } from "react";
import { STOCKCOIN_CONTRACT } from "./config";
import abi from "./abi-stockcoin.json";
import { ethers } from "ethers";

export default function StockCoinExchange() {
  const [stocks, setStocks] = useState([]);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const userSigner = await provider.getSigner();
        setSigner(userSigner);

        const contract = new ethers.Contract(STOCKCOIN_CONTRACT, abi, userSigner);

        try {
          const count = await contract.getListedStockCount();
          const stockList = [];
          for (let i = 0; i < count; i++) {
            const stock = await contract.getStockByIndex(i);
            stockList.push(stock);
          }
          setStocks(stockList);
        } catch (err) {
          console.error("❌ Error fetching stock list:", err);
        }
      }
    };

    init();
  }, []);

  return (
    <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "10px", color: "#f1f5f9" }}>
      <h2>📊 StockCoin Exchange</h2>
      {stocks.length === 0 && <p>⏳ Loading StockCoin listings...</p>}
      <ul>
        {stocks.map((stock, idx) => (
          <li key={idx} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #334155", paddingBottom: "1rem" }}>
            <p><strong>📛 Name:</strong> {stock.name}</p>
            <p><strong>🧾 Description:</strong> {stock.description}</p>
            <p><strong>💰 Price:</strong> {ethers.formatUnits(stock.price, 18)} HYPE</p>
            <p><strong>🧪 Validator Cut:</strong> {stock.validatorPercent}%</p>
            <p><strong>📎 Document:</strong> {stock.docURI || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
