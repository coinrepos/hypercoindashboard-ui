/**
 * BridgePanel.jsx – BTC Price Tracker & Peg Monitor for KREDS Ecosystem
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBitcoin, FaDollarSign, FaLink } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BridgePanel() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [threshold, setThreshold] = useState(25000); // example min threshold for mint cap logic

  useEffect(() => {
    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  async function fetchBTCPrice() {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const price = res.data.bitcoin.usd;
      setBtcPrice(price);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      toast.error("Failed to fetch BTC price");
    }
  }

  const isPegSafe = btcPrice && btcPrice >= threshold;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-gray-900 to-black text-white">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold flex gap-2 items-center text-yellow-400">
          <FaBitcoin /> BTC Bridge Monitor
        </h1>
        <p className="mt-4 text-lg flex items-center gap-2">
          <FaDollarSign /> Current BTC/USD: {btcPrice ? `$${btcPrice.toLocaleString()}` : "Loading..."}
        </p>
        <p className="text-sm text-gray-300 mt-2">Last updated: {lastUpdated || "-"}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white mb-2">⛓ Peg Status</h2>
          <div className={`px-4 py-3 rounded-md ${isPegSafe ? "bg-green-600" : "bg-red-600"}`}>
            {isPegSafe ? "✅ Peg is secure – minting allowed" : "⚠️ BTC peg below threshold – minting restricted"}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm mb-1 text-gray-400">🔒 Set Minimum BTC Peg (USD)</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-500"
          />
        </div>

        <div className="mt-6 text-sm text-blue-400 flex items-center gap-2">
          <FaLink /> Data Source: <a href="https://www.coingecko.com" target="_blank" rel="noreferrer" className="underline">CoinGecko</a>
        </div>
      </div>
    </div>
  );
}
