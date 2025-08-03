// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useHyperCoin } from "./hooks/useHyperCoinContract";

export default function Dashboard() {
  const { contract } = useHyperCoin();
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [decimals, setDecimals] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!contract) return;

      try {
        const [sym, supply, dec] = await Promise.all([
          contract.symbol(),
          contract.totalSupply(),
          contract.decimals()
        ]);

        setSymbol(sym);
        setTotalSupply(supply.toString());
        setDecimals(dec.toString());
      } catch (err) {
        console.error("⚠️ Contract read error:", err);
      }
    };

    fetchDetails();
  }, [contract]);

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#1a1a1a" }}>
      <h1>💰 HyperCoin Dashboard</h1>
      <p><strong>Symbol:</strong> {symbol || "Loading..."}</p>
      <p><strong>Total Supply:</strong> {totalSupply || "Loading..."}</p>
      <p><strong>Decimals:</strong> {decimals || "Loading..."}</p>
    </div>
  );
}
