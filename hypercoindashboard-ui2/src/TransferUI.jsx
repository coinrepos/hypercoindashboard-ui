// src/TransferUI.jsx
import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "./abi/wrappedHyperCoinABI.json";

const contractAddress = "0x15e95b29561D7FFA365E6053E3a42C1d1CDf0d40";

export default function TransferUI() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = async () => {
    if (!window.ethereum) {
      return setStatus("🦊 MetaMask not detected.");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
      await tx.wait();
      setStatus(`✅ Sent ${amount} tokens to ${recipient}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Transfer failed");
    }
  };

  return (
    <div className="transfer-ui">
      <h2>📤 Transfer HyperCoin</h2>
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Send</button>
      <p>{status}</p>
    </div>
  );
}
