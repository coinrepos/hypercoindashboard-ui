import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import TREASURY_ABI from '../../contracts/Treasury.json';

export default function TreasuryControls({ treasuryAddress }) {
  const [amount, setAmount] = useState('');
  const { contract } = useContract(treasuryAddress, TREASURY_ABI);

  const depositFunds = async () => {
    const tx = await contract.deposit({ value: ethers.parseEther(amount) });
    await tx.wait();
    alert('Deposit successful!');
  };

  return (
    <div className="treasury-controls">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="ETH Amount"
      />
      <button onClick={depositFunds}>Deposit</button>
    </div>
  );
}