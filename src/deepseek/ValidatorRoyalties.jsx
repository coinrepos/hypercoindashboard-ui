import React from 'react';
import { useContractRead } from '../hooks/useContractRead';
import ROYALTY_ABI from '../contracts/ValidatorRoyalties.json';

export default function ValidatorRoyalties({ royaltyAddress }) {
  const { data: royalties } = useContractRead(royaltyAddress, ROYALTY_ABI, 'getRoyalties');

  return (
    <div className="royalties-panel">
      <h3>👑 Royalty Distributions</h3>
      <ul>
        {royalties?.map((royalty, i) => (
          <li key={i}>
            Validator {i + 1}: {ethers.formatEther(royalty.amount)} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}