import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import useHyperCoinContract from "./hooks/useHyperCoinContract";

export default function ValidatorMatrix() {
  const { contract } = useHyperCoinContract();
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    const loadValidators = async () => {
      if (!contract) return;

      try {
        const addresses = await contract.getValidatorAddresses();

        const validatorData = await Promise.all(
          addresses.map(async (addr) => {
            const earned = await contract.getValidatorEarnings(addr);
            const fees = await contract.getValidatorRBTCFees(addr);
            const blocks = await contract.getValidatorBlocks(addr);
            const uptime = await contract.getValidatorUptime(addr);
            const score = await contract.getValidatorScore(addr);

            return {
              address: addr,
              hypeEarned: parseFloat(ethers.utils.formatUnits(earned, 18)),
              rbtcFees: parseFloat(ethers.utils.formatUnits(fees, 18)),
              blocks: blocks.toNumber(),
              uptime: `${uptime.toFixed(1)}%`,
              score: score.toFixed(1),
            };
          })
        );

        setValidators(validatorData);
      } catch (err) {
        console.error("🚫 Validator fetch failed:", err);
      }
    };

    loadValidators();
  }, [contract]);

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#0f172a", color: "#fff", marginTop: "2rem", borderRadius: "8px" }}>
      <h2>🔐 Validator Performance Matrix</h2>

      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse", color: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#1e293b" }}>
            <th style={thStyle}>Validator</th>
            <th style={thStyle}>HYPE Earned</th>
            <th style={thStyle}>RBTC Fees</th>
            <th style={thStyle}>Blocks</th>
            <th style={thStyle}>Uptime</th>
            <th style={thStyle}>DAO Score</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((v, i) => (
            <tr key={i} style={{ textAlign: "center", backgroundColor: i % 2 === 0 ? "#0f172a" : "#1e293b" }}>
              <td style={tdStyle}>{v.address}</td>
              <td style={tdStyle}>{v.hypeEarned.toLocaleString()} HYPE</td>
              <td style={tdStyle}>{v.rbtcFees.toFixed(4)} RBTC</td>
              <td style={tdStyle}>{v.blocks}</td>
              <td style={tdStyle}>{v.uptime}</td>
              <td style={tdStyle}>{v.score}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #334155",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #334155",
};
