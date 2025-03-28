import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi-stockcoin.json";
import { STOCKCOIN_CONTRACT, TOKEN_SYMBOL, IPFS_ENABLED } from "./config";

export default function StockCoinMintForm() {
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [validatorCut, setValidatorCut] = useState("");
  const [document, setDocument] = useState(null);
  const [status, setStatus] = useState("");
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    try {
      setMinting(true);
      setStatus("⛓️ Connecting...");

      if (!window.ethereum) throw new Error("MetaMask not detected");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(STOCKCOIN_CONTRACT, abi, signer);

      let ipfsHash = "0x0";
      if (IPFS_ENABLED && document) {
        // Placeholder IPFS simulation
        ipfsHash = ethers.encodeBytes32String("mock-ipfs-hash");
      }

      const tx = await contract.mintStockCoin(
        ethers.encodeBytes32String(assetName),
        ethers.encodeBytes32String(description),
        ethers.parseEther(price),
        validatorCut,
        ipfsHash
      );

      setStatus("⏳ Awaiting confirmation...");
      await tx.wait();
      setStatus(`✅ Minted! TX Hash: ${tx.hash}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Mint failed: ${err.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div style={{
      marginTop: "2rem",
      background: "#1e293b",
      padding: "1.5rem",
      borderRadius: "8px",
      maxWidth: "600px"
    }}>
      <h3>🪙 Mint New StockCoin</h3>

      <label>Asset Name</label>
      <input value={assetName} onChange={e => setAssetName(e.target.value)} placeholder="e.g., Real Estate, Digital IP" />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the asset" />

      <label>Price ({TOKEN_SYMBOL})</label>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

      <label>Validator % Cut</label>
      <input type="number" value={validatorCut} onChange={e => setValidatorCut(e.target.value)} />

      {IPFS_ENABLED && (
        <>
          <label>Attach Document (PDF, image, etc)</label>
          <input type="file" onChange={e => setDocument(e.target.files[0])} />
        </>
      )}

      <button
        onClick={handleMint}
        disabled={minting}
        style={{
          marginTop: "1rem",
          backgroundColor: "#22c55e",
          color: "#000",
          padding: "10px 16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px"
        }}
      >
        {minting ? "Minting..." : "Mint StockCoin"}
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}
