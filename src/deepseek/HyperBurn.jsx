import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import HYPERBURN_ABI from '../../contracts/HyperBurn.json';

export default function HyperBurn({ burnAddress }) {
  const [amount, setAmount] = useState('');
  const { contract } = useContract(burnAddress, HYPERBURN_ABI);

  const burnTokens = async () => {
    const tx = await contract.burn(ethers.parseEther(amount));
    await tx.wait();
    alert('Tokens burned!');
  };

  return (
    <div className="burn-interface">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={burnTokens}>Burn</button>
    </div>
  );
}