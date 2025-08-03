import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import INTAX_ABI from '../contracts/InTax.json';

export default function InTaxPanel({ inTaxAddress }) {
  const [taxRate, setTaxRate] = useState('');
  const { contract } = useContract(inTaxAddress, INTAX_ABI);

  const updateTaxRate = async () => {
    await contract.setTaxRate(taxRate);
    alert(`Tax rate updated to ${taxRate}%`);
  };

  return (
    <div className="intax-panel">
      <h3>💸 InTax Configuration</h3>
      <input
        type="number"
        value={taxRate}
        onChange={(e) => setTaxRate(e.target.value)}
        placeholder="New Tax Rate (%)"
        min="0"
        max="100"
      />
      <button onClick={updateTaxRate}>Update Tax</button>
    </div>
  );
}