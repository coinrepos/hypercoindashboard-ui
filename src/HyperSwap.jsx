import React, { useEffect, useState } from "react";
import { Contract, parseUnits, formatUnits, BrowserProvider } from "ethers";
import routerAbi from "./abi-router.json";
import { ROUTER_CONTRACT, TOKEN_SYMBOL, TAX_TOKEN } from "./config";

export default function HyperSwap() {
  const [amount, setAmount] = useState("");
  const [estimatedOut, setEstimatedOut] = useState(null);
  const [status, setStatus] = useState("Enter amount to swap");
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const s = await provider.getSigner();
        setSigner(s);
      }
    };
    init();
  }, []);

  const getEstimate = async () => {
    try {
      const router = new Contract(ROUTER_CONTRACT, routerAbi, signer);
      const amountIn = parseUnits(amount, 18);
      const out = await router.getRate(amountIn); // router must support getRate()
      setEstimatedOut(formatUnits(out, 18));
      setStatus("✅ Rate fetched");
    } catch (err) {
      setStatus("❌ Failed to fetch rate");
      console.error(err);
    }
  };

  const executeSwap = async () => {
    try {
      const router = new Contract(ROUTER_CONTRACT, routerAbi, signer);
      const amountIn = parseUnits(amount, 18);
      const tx = await router.swap(amountIn); // router must support swap()
      setStatus("⏳ Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ Swap completed!");
    } catch (err) {
      setStatus("❌ Swap failed");
      console.error(err);
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
      <button
        onClick={executeSwap}
        style={{ padding: "0.6rem 1.5rem", background: "#22c55e", marginTop: "1rem" }}
      >
        🚀 Execute Swap
      </button>
      <p>{status}</p>
    </div>
  );
}
