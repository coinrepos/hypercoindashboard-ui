import React, { useState } from "react";
import { Contract, utils, providers } from "ethers";
import routerAbi from "./abi-router.json";
import { ROUTER_CONTRACT, TOKEN_SYMBOL, TAX_TOKEN } from "./config";

export default function InTaxSwap({ onSwapComplete }) {
  const [amount, setAmount] = useState("");
  const [estimatedOut, setEstimatedOut] = useState(null);
  const [status, setStatus] = useState("Enter amount to swap");
  const [isSwapping, setIsSwapping] = useState(false);

  const getEstimate = async () => {
    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const router = new Contract(ROUTER_CONTRACT, routerAbi, signer);

      const amountIn = utils.parseUnits(amount, 18);
      const estimate = await router.getRate(amountIn); // Replace if function is named differently
      setEstimatedOut(utils.formatUnits(estimate, 18));
      setStatus("✅ Rate fetched");
    } catch (err) {
      setStatus("❌ Failed to fetch rate");
      console.error(err);
    }
  };

  const executeSwap = async () => {
    try {
      setIsSwapping(true);
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const router = new Contract(ROUTER_CONTRACT, routerAbi, signer);

      const amountIn = utils.parseUnits(amount, 18);
      const tx = await router.swap(amountIn); // Replace with correct method name if needed
      setStatus("⏳ Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ Swap successful!");
      setIsSwapping(false);
      if (onSwapComplete) onSwapComplete();
    } catch (err) {
      setStatus("❌ Swap failed");
      setIsSwapping(false);
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "2rem", background: "#1e293b", padding: "1.5rem", borderRadius: "8px" }}>
      <h3>💱 InTaxSwap</h3>
      <input
        type="number"
        placeholder={`Amount in ${TOKEN_SYMBOL}`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
      />
      <button onClick={getEstimate} disabled={!amount} style={{ padding: "0.5rem 1rem", marginRight: "1rem" }}>
        🔍 Estimate
      </button>
      {estimatedOut && (
        <p>🔁 Output: {estimatedOut} {TAX_TOKEN}</p>
      )}
      <button
        onClick={executeSwap}
        disabled={isSwapping || !estimatedOut}
        style={{
          padding: "0.6rem 1.5rem",
          background: isSwapping ? "#94a3b8" : "#22c55e",
          color: "#000",
          marginTop: "1rem",
          fontWeight: "bold"
        }}
      >
        🚀 {isSwapping ? "Swapping..." : "Swap Now"}
      </button>
      <p>{status}</p>
    </div>
  );
}
