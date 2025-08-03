import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import VALIDATOR_ABI from '../../contracts/Validator.json';

export default function ValidatorRanking({ validatorAddress }) {
  const { data: validators } = useContractRead(validatorAddress, VALIDATOR_ABI, 'getValidators');

  return (
    <div className="validator-ranking">
      <h3>Top Validators:</h3>
      <ol>
        {validators?.map((v, i) => (
          <li key={i}>{v.address} - {v.stake} STAKE</li>
        ))}
      </ol>
    </div>
  );
}