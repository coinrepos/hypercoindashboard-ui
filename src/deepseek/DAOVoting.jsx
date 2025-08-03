import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import DAO_ABI from '../../contracts/DAO.json';

export default function DAOVoting({ daoAddress }) {
  const [proposalId, setProposalId] = useState('');
  const [vote, setVote] = useState(null);
  const { contract } = useContract(daoAddress, DAO_ABI);

  const handleVote = async () => {
    const tx = await contract.castVote(proposalId, vote);
    await tx.wait();
    alert(`Voted ${vote ? 'YES' : 'NO'} on proposal ${proposalId}`);
  };

  return (
    <div className="dao-voting-card">
      <input 
        type="number" 
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        placeholder="Proposal ID"
      />
      <div className="vote-buttons">
        <button onClick={() => setVote(true)}>✅ Yes</button>
        <button onClick={() => setVote(false)}>❌ No</button>
      </div>
      <button onClick={handleVote}>Submit Vote</button>
    </div>
  );
}