import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import INSURANCE_ABI from '../../contracts/Insurance.json';

export default function InsurancePool({ insuranceAddress }) {
  const { data: poolBalance } = useContractRead(insuranceAddress, INSURANCE_ABI, 'getPoolBalance');

  return (
    <div className="insurance-pool">
      <h3>Pool Balance: {poolBalance} ETH</h3>
    </div>
  );
}