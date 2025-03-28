import React, { useState } from "react";

export default function StockCoinExchange() {
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [validatorCut, setValidatorCut] = useState(1.5); // default %
  const [step, setStep] = useState(1);
  const [proof, setProof] = useState(null);
  const [ipfsEnabled, setIpfsEnabled] = useState(false);

  const handleUpload = (e) => {
    setProof(e.target.files[0]);
  };

  const mintAsset = () => {
    console.log("Minting:", { assetName, description, price, validatorCut, proof });
    alert("✅ StockCoin minted successfully!");
    setStep(1);
    setAssetName("");
    setDescription("");
    setPrice("");
    setProof(null);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", color: "#fff" }}>
      <h2>🏗️ StockCoin Asset Minter</h2>

      {/* Step 1: Input Details */}
      {step === 1 && (
        <div>
          <label>Asset Name:</label>
          <input value={assetName} onChange={(e) => setAssetName(e.target.value)} />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Price (in HYPE):</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>Validator % Cut:</label>
          <input type="number" step="0.1" value={validatorCut} onChange={(e) => setValidatorCut(e.target.value)} />

          <button onClick={() => setStep(2)}>Next ➡️</button>
        </div>
      )}

      {/* Step 2: Upload */}
      {step === 2 && (
        <div>
          <label>📎 Upload Proof (PDF / Image):</label>
          <input type="file" onChange={handleUpload} />

          <div style={{ marginTop: "1rem" }}>
            <label>Enable IPFS storage?</label>
            <input type="checkbox" checked={ipfsEnabled} onChange={(e) => setIpfsEnabled(e.target.checked)} />
          </div>

          <button onClick={() => setStep(3)}>Next ➡️</button>
          <button onClick={() => setStep(1)}>⬅️ Back</button>
        </div>
      )}

      {/* Step 3: Review + Mint */}
      {step === 3 && (
        <div>
          <h3>✅ Review Submission</h3>
          <p><strong>Asset:</strong> {assetName}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Price:</strong> {price} HYPE</p>
          <p><strong>Validator Cut:</strong> {validatorCut}%</p>
          <p><strong>Proof File:</strong> {proof?.name}</p>
          <p><strong>IPFS:</strong> {ipfsEnabled ? "✅ Enabled" : "❌ Off"}</p>

          <button onClick={mintAsset}>🚀 Mint StockCoin</button>
          <button onClick={() => setStep(2)}>⬅️ Back</button>
        </div>
      )}
    </div>
  );
}
