import React, { useState } from "react";
import { Contract, utils, providers } from "ethers";
import abi from "./abi.json";
import { HYPERCOIN_CONTRACT } from "./config.js";

export default function HyperBurn() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmBurn = async () => {
    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(HYPERCOIN_CONTRACT, abi, signer);
      const amountInWei = utils.parseUnits(amount.toString(), 18);
      const tx = await contract.burn(amountInWei);
      setStatus("⏳ Burning...");
      await tx.wait();
      setStatus("🔥 Burn complete!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Burn failed");
    }
    setShowConfirm(false);
  };

  return (
    <div style={{ marginTop: "2rem", background: "#1e293b", padding: "1rem" }}>
      <h3>🔥 Burn $HYPE</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to burn"
      />
      <button
        onClick={() => setShowConfirm(true)}
        style={{ background: "#ef4444", color: "white" }}
      >
        Burn
      </button>
      {showConfirm && (
        <div style={{ background: "#0f172a", padding: "1rem", marginTop: "1rem" }}>
          <p>⚠️ Are you sure you want to burn {amount} $HYPE? This action is irreversible.</p>
          <button onClick={confirmBurn}>Yes, burn it</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}
      <p>{status}</p>
    </div>
  );
}
