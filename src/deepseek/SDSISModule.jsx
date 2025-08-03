import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import SDSIS_ABI from '../../contracts/SDSIS.json';

export default function SDSISModule({ sdsisAddress }) {
  const { data: activePolicies } = useContractRead(sdsisAddress, SDSIS_ABI, 'getActivePolicies');

  return (
    <div className="sdsis-module">
      <h3>Active Policies: {activePolicies?.length || 0}</h3>
    </div>
  );
}