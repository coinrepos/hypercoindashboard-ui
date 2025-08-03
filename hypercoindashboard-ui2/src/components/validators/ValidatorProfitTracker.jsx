import React, { useEffect, useState } from "react";

export default function ValidatorProfitTracker() {
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    const simulated = [
      {
        id: "VAL-001",
        address: "0xabc123...EF12",
        profit: 2580,
        percentage: 8.5,
        timestamp: "2025-03-01",
      },
      {
        id: "VAL-002",
        address: "0xdef456...CD34",
        profit: 1970,
        percentage: 6.2,
        timestamp: "2025-03-01",
      },
      {
        id: "VAL-003",
        address: "0xJake007...JAKE",
        profit: 3860,
        percentage: 12.9,
        timestamp: "2025-03-01",
      },
    ];
    setValidators(simulated);
  }, []);

  const totalProfit = validators.reduce((sum, v) => sum + v.profit, 0);

  return (
    <div style={containerStyle}>
      <h2>📈 Validator Profit Tracker</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Validator</th>
            <th>Profit (HYPE)</th>
            <th>Share %</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((v, i) => (
            <tr key={i}>
              <td>{v.id}</td>
              <td>{v.address}</td>
              <td>{v.profit}</td>
              <td>{v.percentage}%</td>
              <td>{v.timestamp}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>{totalProfit}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const containerStyle = {
  marginTop: "2rem",
  backgroundColor: "#0f172a",
  color: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
};

const tableStyle = {
  width: "100%",
  backgroundColor: "#1e293b",
  borderCollapse: "collapse",
  border: "1px solid #334155",
};
