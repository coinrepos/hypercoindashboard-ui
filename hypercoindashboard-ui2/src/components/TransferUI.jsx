import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../abi/wrappedHyperCoinABI.json"; // Adjust path if needed

const contractAddress = "0x15e95b29561D7FFA365E6053E3a42C1d1CDf0d40"; // Your deployed wHC

const TransferUI = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const transferTokens = async () => {
    try {
      if (!window.ethereum) return setStatus("🦊 MetaMask not available");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const tx = await contract.transfer(
        recipient,
        ethers.parseUnits(amount, 18)
      );
      await tx.wait();
      setStatus("✅ Transfer complete!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Transfer failed.");
    }
  };

  return (
    <div>
      <h2>🔁 Transfer Wrapped HyperCoin</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={transferTokens}>Transfer</button>
      <p>{status}</p>
    </div>
  );
};

export default TransferUI;
