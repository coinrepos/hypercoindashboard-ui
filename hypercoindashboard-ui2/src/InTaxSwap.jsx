import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const HYPE_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F";
const INTAX_ADDRESS = "0x000000000000000000000000000000000000dEaD"; // Replace with real INX address
const CONVERSION_RATE = 1.0; // 1 INX = 1 HYPE (adjustable in DAO)

export default function InTaxSwap({ onSwapComplete }) {
  const [account, setAccount] = useState("");
  const [inxAmount, setInxAmount] = useState("");
  const [status, setStatus] = useState("");
  const [rate] = useState(CONVERSION_RATE);
  const [inxBalance, setInxBalance] = useState(null);
  const [hypeBalance, setHypeBalance] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAccount(addr.toLowerCase());

        const inx = new ethers.Contract(INTAX_ADDRESS, abi, signer);
        const hype = new ethers.Contract(HYPE_ADDRESS, abi, signer);

        const inxBal = await inx.balanceOf(addr);
        const hypeBal = await hype.balanceOf(addr);

        setInxBalance(ethers.utils.formatUnits(inxBal, 18));
        setHypeBalance(ethers.utils.formatUnits(hypeBal, 18));
      }
    };
    init();
  }, []);

  const handleSwap = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const inx = new ethers.Contract(INTAX_ADDRESS, abi, signer);
      const hype = new ethers.Contract(HYPE_ADDRESS, abi, signer);

      const parsedAmount = ethers.utils.parseUnits(inxAmount, 18);

      const burnTx = await inx.burn(parsedAmount); // Burn INX
      setStatus("🔥 Burning INX...");
      await burnTx.wait();

      const mintTx = await hype.mint(account, parsedAmount); // Mint HYPE
      setStatus("💸 Minting HYPE...");
      await mintTx.wait();

      setStatus("✅ Swap complete!");

      if (onSwapComplete) onSwapComplete();
    } catch (err) {
      console.error("❌ Swap failed:", err);
      setStatus("❌ Swap failed. Check console.");
    }
  };

  return (
    <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#1f2937", borderRadius: "8px", color: "#fff" }}>
      <h2>🔁 Intax ➜ HYPE Swap</h2>

      <p>
        Convert <strong>Intax</strong> to <strong>HyperCoin</strong> at a rate of{" "}
        <strong>{rate}</strong>.
      </p>

      <input
        type="text"
        placeholder="Amount of INX to Convert"
        value={inxAmount}
        onChange={(e) => setInxAmount(e.target.value)}
        style={{ padding: "10px", marginBottom: "1rem", width: "100%" }}
      />

      <button
        onClick={handleSwap}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0ea5e9",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        Convert to HYPE
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>

      <div style={{ marginTop: "1rem" }}>
        <p>💰 INX Balance: {inxBalance}</p>
        <p>🪙 HYPE Balance: {hypeBalance}</p>
      </div>
    </div>
  );
}
