import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const factoryContractAddress = "0xb83b08bd688739dcf499091B7596931c2DD8835F"; // Use your factory/mint contract

export default function HyperExchange() {
  const [step, setStep] = useState(1);
  const [assetType, setAssetType] = useState("Business");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [status, setStatus] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const connectContract = () => {
    if (!window.ethereum) {
      setStatus("❌ MetaMask not detected.");
      return null;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(factoryContractAddress, abi, signer);
  };

  const handleMint = async () => {
    try {
      const contract = connectContract();
      if (!contract) return;

      const supply = ethers.utils.parseUnits(totalSupply, 18);
      const tx = await contract.createStockCoin(tokenName, tokenSymbol, supply, assetType); // adjust function name to match your contract

      setStatus("⏳ Minting StockCoin...");
      await tx.wait();
      setStatus("✅ StockCoin successfully minted!");
      setStep(1);
    } catch (err) {
      console.error(err);
      setStatus("❌ Minting failed.");
    }
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🧱 HyperExchange – Tokenize Your Asset</h2>
      {step === 1 && (
        <>
          <label>Select Asset Type:</label>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value)} style={inputStyle}>
            <option value="Business">🏢 Business</option>
            <option value="RealEstate">🏠 Real Estate</option>
            <option value="Book">📘 Book</option>
            <option value="IP">🎼 Intellectual Property</option>
            <option value="App">📱 Mobile/Web App</option>
            <option value="Other">🔧 Other</option>
          </select>
          <button onClick={handleNext} style={btnStyle}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Token Name (e.g. MyAssetCoin)"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Token Symbol (e.g. MAC)"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Total Supply"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleBack} style={btnStyleAlt}>Back</button>
          <button onClick={handleNext} style={btnStyle}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h4>Confirm Details:</h4>
          <p><strong>Type:</strong> {assetType}</p>
          <p><strong>Name:</strong> {tokenName}</p>
          <p><strong>Symbol:</strong> {tokenSymbol}</p>
          <p><strong>Supply:</strong> {totalSupply}</p>
          <button onClick={handleBack} style={btnStyleAlt}>Back</button>
          <button onClick={handleMint} style={{ ...btnStyle, backgroundColor: "#22c55e" }}>Mint StockCoin</button>
        </>
      )}

      {status && <p style={{ color: "#4ade80", marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

const panelStyle = {
  backgroundColor: "#111",
  padding: "2rem",
  borderRadius: "10px",
  color: "#fff",
  marginTop: "2rem",
};

const titleStyle = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  width: "100%",
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #444",
  marginBottom: "1rem",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  padding: "10px 16px",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  marginRight: "10px",
  cursor: "pointer",
};

const btnStyleAlt = {
  ...btnStyle,
  backgroundColor: "#6b7280",
};
