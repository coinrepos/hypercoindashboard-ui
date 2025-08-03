// src/StockCoinMintForm.jsx
import React, { useState } from "react";
import { Contract, providers, utils } from "ethers";
import abi from "./abi-stockcoin.json";
import { STOCKCOIN_CONTRACT, TOKEN_SYMBOL } from "./config.js";

export default function StockCoinMintForm() {
  const [asset, setAsset] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [validatorCut, setValidatorCut] = useState("1");
  const [status, setStatus] = useState("");

  const mint = async () => {
    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(STOCKCOIN_CONTRACT, abi, signer);
      const priceInUnits = utils.parseUnits(price.toString(), 18);

      setStatus("⏳ Minting...");
      const tx = await contract.mint(
        String(asset),
        String(description),
        priceInUnits,
        validatorCut.toString()
      );
      await tx.wait();
      setStatus("✅ Mint successful!");
    } catch (err) {
      console.error(err);
      setStatus(`❌ Mint failed: ${err.reason || err.message}`);
    }
  };

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", background: "#1e293b" }}>
      <h3>🧾 Mint New StockCoin</h3>
      <input
        placeholder="Asset Name"
        value={asset}
        onChange={(e) => setAsset(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder={`Price (${TOKEN_SYMBOL})`}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Validator % Cut"
        value={validatorCut}
        onChange={(e) => setValidatorCut(e.target.value)}
      />
      <button onClick={mint}>Mint StockCoin</button>
      <p>{status}</p>
    </div>
  );
}
