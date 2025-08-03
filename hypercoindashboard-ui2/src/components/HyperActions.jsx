import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const HYPE_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F";

export default function HyperActions() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const transferHYPE = async () => {
    try {
      if (!window.ethereum) return setStatus("🦊 MetaMask not detected");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(HYPE_ADDRESS, abi, signer);

      const tx = await contract.transfer(
        recipient,
        ethers.utils.parseUnits(amount, 18)
      );

      setStatus("⏳ Awaiting confirmation...");
      await tx.wait();
      setStatus("✅ Transfer successful!");
    } catch (err) {
      console.error("❌ Transfer failed:", err);
      setStatus("❌ Transfer failed");
    }
  };

  return (
    <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#1e293b", borderRadius: "8px", color: "#fff" }}>
      <h2>💸 Transfer HYPE</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ padding: "8px", margin: "0.5rem 0", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "8px", marginBottom: "1rem", width: "100%" }}
      />
      <button
        onClick={transferHYPE}
        style={{ padding: "10px 20px", backgroundColor: "#38bdf8", border: "none", borderRadius: "6px", color: "#000", fontWeight: "bold" }}
      >
        Send HYPE
      </button>
      <p>{status}</p>
    </div>
  );
}
