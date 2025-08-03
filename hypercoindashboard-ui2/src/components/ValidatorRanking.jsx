import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import useHyperCoinContract from "./hooks/useHyperCoinContract";

export default function ValidatorRank() {
  const { contract } = useHyperCoinContract();
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    const fetchValidators = async () => {
      if (!contract) return;

      try {
        const addresses = await contract.getValidatorAddresses?.(); // replace with actual if different
        const signer = contract.runner?.provider?.getSigner?.();
        const userAddress = signer ? await signer.getAddress() : "";

        const results = await Promise.all(
          addresses.map(async (addr) => {
            const score = await contract.getValidatorScore(addr);
            const earnings = await contract.getValidatorEarnings(addr);

            return {
              address: addr,
              score: parseInt(score),
              earnings: parseFloat(ethers.utils.formatUnits(earnings, 18)),
              you: addr.toLowerCase() === userAddress?.toLowerCase()
            };
          })
        );

        // Sort by score descending
        const sorted = results.sort((a, b) => b.score - a.score);
        setValidators(sorted);
      } catch (err) {
        console.error("🚫 Error fetching validator rank data:", err);
      }
    };

    fetchValidators();
  }, [contract]);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>📊 Validator Matrix</h2>
      <p>Network-wide ranking of validator performance & profits.</p>
      <table style={{ width: "100%", marginTop: "1.5rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Score</th>
            <th style={thStyle}>Earnings (HYPE)</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((v, idx) => (
            <tr key={idx} style={{ backgroundColor: v.you ? "#16a34a" : "#1e293b" }}>
              <td style={tdStyle}>{idx + 1}</td>
              <td style={tdStyle}>{v.address}</td>
              <td style={tdStyle}>{v.score}</td>
              <td style={tdStyle}>{v.earnings.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #334155"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #334155"
};
