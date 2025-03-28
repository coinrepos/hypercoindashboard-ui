import React, { useEffect, useState } from "react";

export default function TreasuryTracker() {
  const [data, setData] = useState({
    totalMinted: 0,
    totalBurned: 0,
    totalWallets: 0,
    activeProposals: 0,
    emergencyFreeze: false,
    treasuryHYPE: 0,
  });

  useEffect(() => {
    const fetchTreasuryStats = async () => {
      // 🔁 Simulated snapshot – hook with backend, subgraph, or contract calls later
      setTimeout(() => {
        setData({
          totalMinted: 1520000,
          totalBurned: 180300,
          totalWallets: 2832,
          activeProposals: 7,
          emergencyFreeze: false,
          treasuryHYPE: 184000,
        });
      }, 1000);
    };

    fetchTreasuryStats();
  }, []);

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", marginTop: "2rem" }}>
      <h2>💼 Treasury Overview</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
        <StatCard title="Total Minted" value={`${data.totalMinted.toLocaleString()} HYPE`} />
        <StatCard title="Total Burned" value={`${data.totalBurned.toLocaleString()} HYPE`} />
        <StatCard title="Total Wallets" value={data.totalWallets.toLocaleString()} />
        <StatCard title="Active Proposals" value={data.activeProposals} />
        <StatCard title="Treasury Reserves" value={`${data.treasuryHYPE.toLocaleString()} HYPE`} />
        <StatCard
          title="Emergency Lockdown"
          value={data.emergencyFreeze ? "🛑 ACTIVE" : "✅ Normal"}
          bg={data.emergencyFreeze ? "#f87171" : "#22c55e"}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, bg = "#1e293b" }) {
  return (
    <div style={{ backgroundColor: bg, padding: "1rem", borderRadius: "6px", minWidth: "180px", flex: 1 }}>
      <h4 style={{ margin: "0 0 0.5rem" }}>{title}</h4>
      <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{value}</p>
    </div>
  );
}
