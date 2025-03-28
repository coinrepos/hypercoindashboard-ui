import { useEffect, useState } from "react";

// Mock Oracle Rates & TVL per token
const ORACLE_RATES = {
  HYPE: 1.00,
  INX: 0.94,
  "STKC-HOME1": 135.42,
  "STKC-IPX1": 18.67,
  "STKC-GOLD": 1990.15,
};

const MOCK_TVL = {
  HYPE: 2100000,
  INX: 1750000,
  "STKC-HOME1": 885000,
  "STKC-IPX1": 232000,
  "STKC-GOLD": 1250000,
};

export default function HyperSwapPro() {
  const [fromToken, setFromToken] = useState("HYPE");
  const [toToken, setToToken] = useState("INX");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [slippageType, setSlippageType] = useState("short");
  const [oracleRate, setOracleRate] = useState(null);
  const [impact, setImpact] = useState(null);
  const [autoPath, setAutoPath] = useState("");

  const tokens = ["HYPE", "INX", "STKC-HOME1", "STKC-IPX1", "STKC-GOLD"];

  useEffect(() => {
    if (fromToken && toToken) {
      const rateFrom = ORACLE_RATES[fromToken] || 1;
      const rateTo = ORACLE_RATES[toToken] || 1;
      const path = `${fromToken} ➡ ${toToken}`;
      const swapRate = rateFrom / rateTo;
      setOracleRate(swapRate.toFixed(6));
      setAutoPath(path);
    }
  }, [fromToken, toToken]);

  const getSlippageRate = () => {
    return slippageType === "short" ? 0.0002 : 0.0001;
  };
  const simulateSwap = () => {
    if (!amount || isNaN(amount)) {
      return setResult("❌ Invalid amount.");
    }

    const amt = parseFloat(amount);
    const slippage = getSlippageRate();
    const fee = amt * slippage;
    const received = amt - fee;

    const rateFrom = ORACLE_RATES[fromToken] || 1;
    const rateTo = ORACLE_RATES[toToken] || 1;
    const swapRate = rateFrom / rateTo;
    const finalAmount = received * swapRate;

    // Market impact simulation (based on TVL)
    const liquidity = MOCK_TVL[fromToken] || 100000;
    const impactLevel = (amt / liquidity) * 100;
    let impactDesc = "🟢 Low";

    if (impactLevel > 10) impactDesc = "🟡 Moderate";
    if (impactLevel > 25) impactDesc = "🔴 High";
    if (impactLevel > 50) impactDesc = "⚠️ CRITICAL";

    setImpact(impactDesc);
    setResult(`✅ Swapped ${amt} ${fromToken} ➡ ${finalAmount.toFixed(6)} ${toToken} (fee: ${fee.toFixed(6)} ${fromToken})`);
  };
  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🔄 HyperSwap Pro</h2>
      <p style={descStyle}>
        Swap between HYPE, INX, and StockCoins. Live price rates, simulated liquidity, validator slippage included.
      </p>

      <div style={fieldBlock}>
        <label>From:</label>
        <select value={fromToken} onChange={(e) => setFromToken(e.target.value)} style={selectStyle}>
          {tokens.map((token) => <option key={token}>{token}</option>)}
        </select>
      </div>

      <div style={fieldBlock}>
        <label>To:</label>
        <select value={toToken} onChange={(e) => setToToken(e.target.value)} style={selectStyle}>
          {tokens.filter((t) => t !== fromToken).map((token) => <option key={token}>{token}</option>)}
        </select>
      </div>

      <div style={fieldBlock}>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} />
      </div>

      <div style={fieldBlock}>
        <label>Slippage Type:</label>
        <select value={slippageType} onChange={(e) => setSlippageType(e.target.value)} style={selectStyle}>
          <option value="short">Short-Term (0.0002%)</option>
          <option value="long">Long-Term (0.0001%)</option>
        </select>
      </div>

      <div style={metricsBox}>
        <p><strong>Swap Path:</strong> {autoPath}</p>
        <p><strong>Oracle Rate:</strong> 1 {fromToken} = {oracleRate} {toToken}</p>
        <p><strong>Market Impact:</strong> {impact || "N/A"}</p>
      </div>

      <button onClick={simulateSwap} style={btnStyle}>Swap Now</button>

      {result && <p style={resultStyle}>{result}</p>}
    </div>
  );
}

// 🧱 Styles
const panelStyle = {
  backgroundColor: "#111",
  color: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  marginTop: "2rem",
};

const titleStyle = {
  fontSize: "1.5rem",
};

const descStyle = {
  color: "#aaa",
  marginBottom: "1.5rem",
};

const fieldBlock = {
  marginBottom: "1rem",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#1f1f1f",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "6px",
};

const inputStyle = {
  ...selectStyle,
};

const metricsBox = {
  backgroundColor: "#0f172a",
  padding: "1rem",
  borderRadius: "8px",
  margin: "1rem 0 2rem",
  fontSize: "0.95rem",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const resultStyle = {
  marginTop: "1rem",
  color: "#4ade80",
};
