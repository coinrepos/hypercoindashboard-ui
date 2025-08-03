// src/components/StockCoinExchange.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../abi/StockCoinABI.json";

const contractAddress = "0x15e95b29561D7FFA365E6053E3a42C1d1CDf0d40";

export default function StockCoinExchange() {
  const [price, setPrice] = useState("0");
  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          const _contract = new ethers.Contract(contractAddress, ABI, signer);
          const _price = await _contract.getStockPrice(); // Example method

          setAccount(address);
          setPrice(ethers.formatUnits(_price, 18));
          setContract(_contract);
        } catch (err) {
          console.error(err);
          setStatus("❌ Failed to connect");
        }
      }
    };
    init();
  }, []);

  const buyStock = async () => {
    if (!contract || !amount) return;

    try {
      const total = ethers.parseUnits((parseFloat(price) * parseFloat(amount)).toString(), 18);
      const tx = await contract.buyStockCoin(amount, { value: total });
      await tx.wait();
      setStatus(`✅ Purchased ${amount} StockCoin`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction failed");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#1e1e2e", color: "#fff" }}>
      <h2>📈 StockCoin Exchange</h2>
      <p>Price per unit: {price} ETH</p>
      <p>Connected as: {account}</p>

      <input
        type="number"
        placeholder="Amount to buy"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={buyStock}>Buy</button>

      <p>{status}</p>
    </div>
  );
}
