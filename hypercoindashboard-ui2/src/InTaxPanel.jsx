import { useState } from "react";

export default function InTaxPanel() {
  const [spendAmount, setSpendAmount] = useState("");
  const [calculatedTax, setCalculatedTax] = useState(null);

  const baseRate = 2.5; // Default InTax rate (%)

  const handleCalculate = () => {
    const amount = parseFloat(spendAmount);
    if (isNaN(amount) || amount <= 0) {
      setCalculatedTax("❌ Enter a valid spend amount.");
      return;
    }
    const reward = (amount * baseRate) / 100;
    setCalculatedTax(`💸 You’ll earn approx. ${reward.toFixed(4)} HYPE`);
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🧾 InTax Royalty Panel</h2>

      <p style={{ color: "#ccc" }}>
        The current royalty rate is <strong>{baseRate}%</strong>. The more you
        spend, the more HYPE you earn.
      </p>

      <input
        type="number"
        placeholder="Enter spend amount"
        value={spendAmount}
        onChange={(e) => setSpendAmount(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleCalculate} style={btnStyle}>
        Calculate HYPE Earned
      </button>

      {calculatedTax && <p style={{ marginTop: "1rem", color: "#4ade80" }}>{calculatedTax}</p>}

      <hr style={{ margin: "2rem 0", borderColor: "#333" }} />

      <p style={{ color: "#888" }}>🔥 Estimated InTax Revenue Burned:</p>
      <h4 style={{ color: "#f87171" }}>7,248.552 HYPE 🔥</h4>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        (This will be fetched live once the InTax event log is integrated.)
      </p>
    </div>
  );
}

const panelStyle = {
  backgroundColor: "#1a1a1a",
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
  cursor: "pointer",
};
