import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import VALIDATOR_ABI from '../../contracts/Validator.json';

export default function ValidatorMatrix({ validatorAddress }) {
  const { data: matrix } = useContractRead(validatorAddress, VALIDATOR_ABI, 'getValidatorMatrix');

  return (
    <div className="validator-matrix">
      <pre>{JSON.stringify(matrix, null, 2)}</pre>
    </div>
  );
}