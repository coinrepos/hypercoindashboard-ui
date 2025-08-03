import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import useHyperCoinContract from "../hooks/useHyperCoinContract";

export default function ValidatorProfitTracker() {
  const { contract } = useHyperCoinContract();
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    const fetchValidatorData = async () => {
      if (!contract) return;

      try {
        // 🧠 Assuming the contract has a public array or mapping of validator earnings.
        const validatorAddresses = await contract.getValidatorAddresses?.(); // e.g. ['0xabc...', '0xdef...']
        const promises = validatorAddresses.map(async (addr) => {
          const earnings = await contract.getValidatorEarnings(addr); // returns BigNumber
          const share = await contract.getValidatorShare(addr); // e.g. 0.085 = 8.5%
          return {
            address: addr,
            profit: parseFloat(ethers.utils.formatUnits(earnings, 18)),
            percentage: (share * 100).toFixed(2),
            timestamp: new Date().toISOString().split("T")[0],
          };
        });

        const fetched = await Promise.all(promises);
        const withIds = fetched.map((v, i) => ({ id: `VAL-${i + 1}`, ...v }));
        setValidators(withIds);
      } catch (err) {
        console.error("📉 Failed to fetch validator profits:", err);
      }
    };

    fetchValidatorData();
  }, [contract]);

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
              <td>{v.profit.toLocaleString()}</td>
              <td>{v.percentage}%</td>
              <td>{v.timestamp}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>{totalProfit.toLocaleString()}</strong></td>
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
