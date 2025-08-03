import React, { useState } from 'react';

export default function InTaxBurnSimulator() {
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('5');
  const burnAmount = (parseFloat(amount) || 0) * (1 - parseFloat(taxRate) / 100);

  return (
    <div className="burn-simulator">
      <h3>🔥 Burn Tax Simulator</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to Burn"
      />
      <input
        type="number"
        value={taxRate}
        onChange={(e) => setTaxRate(e.target.value)}
        placeholder="Burn Tax Rate (%)"
      />
      <div className="result">
        <p>Actual Burned: <strong>{burnAmount.toFixed(4)}</strong></p>
        <p>Tax Deducted: <strong>{(parseFloat(amount) - burnAmount).toFixed(4)}</strong></p>
      </div>
    </div>
  );
}