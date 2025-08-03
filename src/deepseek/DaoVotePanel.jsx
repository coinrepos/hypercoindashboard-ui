import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import DAO_ABI from '../../contracts/DAO.json';

export default function DAOVotePanel({ daoAddress, proposalId }) {
  const { data: proposal } = useContractRead(daoAddress, DAO_ABI, 'proposals', [proposalId]);

  return (
    <div className="vote-panel">
      <h3>Proposal #{proposalId}</h3>
      <p>Status: {proposal?.passed ? '✅ Approved' : '❌ Rejected'}</p>
    </div>
  );
}