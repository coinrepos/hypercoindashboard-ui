// src/WrappedHyperCoinDashboard.jsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "./abi/wrappedHyperCoinABI.json";

const contractAddress = "0x15e95b29561D7FFA365E6053E3a42C1d1CDf0d40";

export default function WrappedHyperCoinDashboard() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, ABI, signer);

        setAccount(address);
        setContract(contractInstance);
      } else {
        setStatus("🦊 MetaMask not detected.");
      }
    };
    init();
  }, []);

  const handleTransfer = async () => {
    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
      await tx.wait();
      setStatus(`✅ Sent ${amount} wHC to ${recipient}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Transfer failed");
    }
  };

  const handleAddLiquidity = async () => {
    try {
      const tx = await contract.mint(account, ethers.parseUnits("10", 18));
      await tx.wait();
      setStatus("✅ Liquidity added!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error adding liquidity");
    }
  };

  const handleCheckLiquidity = async () => {
    try {
      const balance = await contract.balanceOf(account);
      setStatus(`💰 Balance: ${ethers.formatUnits(balance, 18)} wHC`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error checking balance");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>💎 Wrapped HyperCoin Dashboard</h2>
      {account ? <p>👤 Connected: {account}</p> : <p>🦊 Please connect MetaMask</p>}

      <div>
        <h3>💸 Transfer wHC</h3>
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
        <button onClick={handleTransfer}>Transfer</button>
      </div>

      <div>
        <h3>💧 Add Liquidity</h3>
        <button onClick={handleAddLiquidity}>Add 10 wHC</button>
      </div>

      <div>
        <h3>🔍 Check Balance</h3>
        <button onClick={handleCheckLiquidity}>Check</button>
      </div>

      <p>{status}</p>
    </div>
  );
}
