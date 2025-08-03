import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import SDSIS_ABI from '../../contracts/SDSIS.json';

export default function SDSISApplication({ sdsisAddress }) {
  const [coverAmount, setCoverAmount] = useState('');
  const { contract } = useContract(sdsisAddress, SDSIS_ABI);

  const applyForCover = async () => {
    const tx = await contract.applyForCover(ethers.parseEther(coverAmount));
    await tx.wait();
    alert('Cover application submitted!');
  };

  return (
    <div className="sdsis-form">
      <input
        type="number"
        value={coverAmount}
        onChange={(e) => setCoverAmount(e.target.value)}
        placeholder="Cover Amount (ETH)"
      />
      <button onClick={applyForCover}>Apply</button>
    </div>
  );
}