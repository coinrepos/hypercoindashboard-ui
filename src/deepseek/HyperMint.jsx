import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import HYPERMINT_ABI from '../../contracts/HyperMint.json';

export default function HyperMint({ mintAddress }) {
  const [amount, setAmount] = useState('');
  const { contract } = useContract(mintAddress, HYPERMINT_ABI);

  const mintTokens = async () => {
    const tx = await contract.mint(ethers.parseEther(amount));
    await tx.wait();
    alert('Tokens minted!');
  };

  return (
    <div className="mint-interface">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={mintTokens}>Mint</button>
    </div>
  );
}