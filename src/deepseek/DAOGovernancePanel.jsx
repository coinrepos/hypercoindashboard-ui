import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import DAO_ABI from '../../contracts/DAO.json';

export default function DAOGovernancePanel({ daoAddress }) {
  const [proposalDesc, setProposalDesc] = useState('');
  const { contract } = useContract(daoAddress, DAO_ABI);

  const createProposal = async () => {
    const tx = await contract.createProposal(proposalDesc);
    await tx.wait();
    alert('Proposal created!');
  };

  return (
    <div className="governance-panel">
      <textarea 
        value={proposalDesc}
        onChange={(e) => setProposalDesc(e.target.value)}
        placeholder="Describe your proposal"
      />
      <button onClick={createProposal}>Submit Proposal</button>
    </div>
  );
}