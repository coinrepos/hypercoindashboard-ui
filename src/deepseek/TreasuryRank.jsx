import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import TREASURY_ABI from '../../contracts/Treasury.json';

export default function TreasuryRank({ treasuryAddress }) {
  const { data: balance } = useContractRead(treasuryAddress, TREASURY_ABI, 'getBalance');

  return (
    <div className="treasury-rank">
      <h3>Treasury Balance: {balance} ETH</h3>
    </div>
  );
}