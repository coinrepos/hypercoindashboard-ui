import { useEffect, useState } from "react";

export default function ValidatorRoyalties() {
  const [transactions, setTransactions] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    const mockData = [
      {
        coin: "HYPE",
        date: "2025-03-18",
        txHash: "0xabc...f91",
        royaltyPercent: 0.01,
        earned: 24.89,
      },
      {
        coin: "STKC-HOME1",
        date: "2025-03-21",
        txHash: "0xdef...9b3",
        royaltyPercent: 0.01,
        earned: 82.15,
      },
      {
        coin: "INTAX",
        date: "2025-03-22",
        txHash: "0x456...ccc",
        royaltyPercent: 0.01,
        earned: 14.44,
      },
    ];
    setTransactions(mockData);
    const total = mockData.reduce((sum, tx) => sum + tx.earned, 0);
    setTotalEarned(total);
  }, []);

  const downloadCSV = () => {
    const rows = [
      ["Date", "Coin", "Royalty (%)", "Earned ($)", "TX Hash"],
      ...transactions.map((tx) => [
        tx.date,
        tx.coin,
        (tx.royaltyPercent * 100).toFixed(2),
        tx.earned.toFixed(2),
        tx.txHash,
      ]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", "validator_royalties.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const byCoin = transactions.reduce((acc, tx) => {
    acc[tx.coin] = (acc[tx.coin] || 0) + tx.earned;
    return acc;
  }, {});

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>💰 Validator Royalties+ Dashboard</h2>
      <p style={descStyle}>Total earnings from your embedded validators. Export, analyze, and optimize revenue.</p>

      <div style={summaryBox}>
        <p><strong>Lifetime Earnings:</strong> ${totalEarned.toLocaleString()}</p>
        <p><strong>Average Per TX:</strong> ${(totalEarned / transactions.length).toFixed(2)}</p>
        <p><strong>Most Profitable Coin:</strong> {
          Object.entries(byCoin).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
        }</p>
        <button onClick={downloadCSV} style={csvBtn}>📤 Export CSV</button>
      </div>

      {/* Simulated Chart */}
      <div style={chartBox}>
        <h4 style={{ marginBottom: "0.5rem" }}>📈 Earnings Distribution (Simulated)</h4>
        {Object.entries(byCoin).map(([coin, amount], i) => (
          <div key={i} style={chartBar}>
            <span style={{ width: "120px" }}>{coin}</span>
            <div style={{ backgroundColor: "#3b82f6", width: `${amount}px`, height: "10px", marginLeft: "8px" }} />
            <span style={{ marginLeft: "8px" }}>${amount.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Transaction Table */}
      <hr style={{ margin: "2rem 0", borderColor: "#333" }} />
      <h4>📜 Royalty Log</h4>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Coin</th>
            <th>Royalty</th>
            <th>Earned ($)</th>
            <th>TX Hash</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i}>
              <td>{tx.date}</td>
              <td>{tx.coin}</td>
              <td>{(tx.royaltyPercent * 100).toFixed(2)}%</td>
              <td>${tx.earned.toFixed(2)}</td>
              <td><code>{tx.txHash}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
  margin: "0.5rem 0 1.5rem",
};

const summaryBox = {
  backgroundColor: "#0f172a",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "2rem",
};

const chartBox = {
  marginTop: "2rem",
  backgroundColor: "#0f172a",
  padding: "1rem",
  borderRadius: "8px",
};

const chartBar = {
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#1f1f1f",
  border: "1px solid #333",
};

const csvBtn = {
  marginTop: "1rem",
  backgroundColor: "#10b981",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};
