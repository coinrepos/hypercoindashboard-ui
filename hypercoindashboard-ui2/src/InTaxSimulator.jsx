import { useState } from "react";

export default function InTaxSimulator() {
  const [spendingRate, setSpendingRate] = useState(1000000); // $ spent daily
  const [taxRate, setTaxRate] = useState(2.5); // %
  const [days, setDays] = useState(30);
  const [results, setResults] = useState(null);

  const simulateBurn = () => {
    const totalInTax = (spendingRate * (taxRate / 100)) * days;
    const avgDailyBurn = totalInTax / days;
    const annualProjection = totalInTax * 12;

    setResults({
      totalInTax,
      avgDailyBurn,
      annualProjection,
    });
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🔥 InTax Burn Simulator</h2>
      <p style={descStyle}>Model how economic activity influences InTax burn, debt payoff, and monetary contraction.</p>

      <div style={inputBlock}>
        <label>🧾 Daily Economic Activity ($ spent):</label>
        <input type="number" value={spendingRate} onChange={(e) => setSpendingRate(Number(e.target.value))} style={inputStyle} />
      </div>

      <div style={inputBlock}>
        <label>💸 Tax Rate (%):</label>
        <input type="number" value={taxRate} step="0.1" onChange={(e) => setTaxRate(Number(e.target.value))} style={inputStyle} />
      </div>

      <div style={inputBlock}>
        <label>📆 Simulation Period (days):</label>
        <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} style={inputStyle} />
      </div>

      <button onClick={simulateBurn} style={btnStyle}>Simulate</button>

      {results && (
        <div style={resultBox}>
          <h4>📊 Simulation Results</h4>
          <p><strong>Total InTax Burned:</strong> {results.totalInTax.toLocaleString()} INX</p>
          <p><strong>Average Daily Burn:</strong> {results.avgDailyBurn.toLocaleString()} INX/day</p>
          <p><strong>Annualized Burn Projection:</strong> {results.annualProjection.toLocaleString()} INX/year</p>
          <p style={{ color: "#4ade80" }}>💡 Higher spending + stable tax rate = faster debt burn, stable HyperCoin supply.</p>
        </div>
      )}
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
};

const descStyle = {
  color: "#ccc",
  marginBottom: "1.5rem",
};

const inputBlock = {
  marginBottom: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "6px",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const resultBox = {
  marginTop: "2rem",
  backgroundColor: "#0f172a",
  padding: "1rem",
  borderRadius: "8px",
};
