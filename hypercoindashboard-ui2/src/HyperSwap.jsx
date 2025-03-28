// src/HyperSwap.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import routerAbi from "./abi-router.json";
import { ROUTER_CONTRACT, TOKEN_SYMBOL, TAX_TOKEN } from "./config";

export default function HyperSwap() {
  const [amount, setAmount] = useState("");
  const [estimatedOut, setEstimatedOut] = useState(null);
  const [status, setStatus] = useState("Enter amount to swap");
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.getSigner().then(setSigner);
    }
  }, []);

  const getEstimate = async () => {
    try {
      const router = new ethers.Contract(ROUTER_CONTRACT, routerAbi, signer);
      const amountIn = ethers.parseUnits(amount, 18);
      const out = await router.getSwapEstimate(amountIn); // ✅ LIVE router method
      setEstimatedOut(ethers.formatUnits(out, 18));
      setStatus("✅ Rate fetched from Router");
    } catch (err) {
      setStatus("❌ Failed to fetch rate");
      console.error("🧯 Estimate error:", err);
    }
  };

  const executeSwap = async () => {
    try {
      const router = new ethers.Contract(ROUTER_CONTRACT, routerAbi, signer);
      const amountIn = ethers.parseUnits(amount, 18);
      const tx = await router.swapHypeToIntax(amountIn); // ✅ LIVE router method
      setStatus("⏳ Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ Swap completed!");
    } catch (err) {
      setStatus("❌ Swap failed");
      console.error("🔥 Swap error:", err);
    }
  };

  return (
    <div style={{ marginTop: "2rem", background: "#1e293b", padding: "1.5rem", borderRadius: "8px" }}>
      <h3>💱 HyperSwap</h3>
      <input
        type="number"
        placeholder={`Amount in ${TOKEN_SYMBOL}`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
      />
      <button onClick={getEstimate} style={{ padding: "0.5rem 1rem" }}>
        🔍 Estimate
      </button>
      {estimatedOut && (
        <p>
          🔁 Estimated output: {estimatedOut} {TAX_TOKEN}
        </p>
      )}
      <button onClick={executeSwap} style={{ padding: "0.6rem 1.5rem", background: "#22c55e", marginTop: "1rem" }}>
        🚀 Execute Swap
      </button>
      <p>{status}</p>
    </div>
  );
}
