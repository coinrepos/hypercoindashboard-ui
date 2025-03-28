import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { HYPERCOIN_CONTRACT, TOKEN_SYMBOL } from "./config";

export default function HyperBurn() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Enter amount to burn");
  const [isBurning, setIsBurning] = useState(false);

  const burnTokens = async () => {
    try {
      setIsBurning(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(HYPERCOIN_CONTRACT, abi, signer);

      const parsedAmount = ethers.parseUnits(amount, 18);
      const tx = await contract.burn(parsedAmount); // Make sure your contract exposes burn()
      setStatus("⏳ Awaiting burn confirmation...");
      await tx.wait();
      setStatus("🔥 Tokens burned successfully!");
      setIsBurning(false);
    } catch (err) {
      console.error("❌ Burn error:", err);
      setStatus("❌ Burn failed");
      setIsBurning(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem", background: "#1f2937", padding: "1.5rem", borderRadius: "8px" }}>
      <h3>🔥 HyperBurn</h3>
      <input
        type="number"
        placeholder={`Amount in ${TOKEN_SYMBOL}`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
      />
      <button
        onClick={burnTokens}
        disabled={isBurning || !amount}
        style={{
          padding: "0.6rem 1.5rem",
          background: isBurning ? "#94a3b8" : "#ef4444",
          color: "#fff",
          marginTop: "1rem",
          fontWeight: "bold"
        }}
      >
        {isBurning ? "Burning..." : "🔥 Burn"}
      </button>
      <p>{status}</p>
    </div>
  );
}
