import React, { useState } from 'react';

export default function InTaxSimulator() {
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('10');
  const taxAmount = (parseFloat(amount) || 0) * (parseFloat(taxRate) / 100);

  return (
    <div className="intax-simulator">
      <h3>🧮 Tax Simulation</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (ETH)"
      />
      <input
        type="number"
        value={taxRate}
        onChange={(e) => setTaxRate(e.target.value)}
        placeholder="Tax Rate (%)"
      />
      <div className="result">
        <p>Tax Due: <strong>{taxAmount.toFixed(4)} ETH</strong></p>
        <p>Net Received: <strong>{(parseFloat(amount) - taxAmount).toFixed(4)} ETH</strong></p>
      </div>
    </div>
  );
}