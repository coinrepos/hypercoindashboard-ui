// components/DashboardActions.js
import React, { useState } from 'react';
import axios from 'axios';

const DashboardActions = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [proposal, setProposal] = useState('');

  const handleMint = async () => {
    await axios.post('/api/mint', { to: address, amount });
    alert('Minted tokens successfully');
  };

  const handleStake = async () => {
    await axios.post('/api/stake', { staker: address, amount });
    alert('Staked tokens successfully');
  };

  const handleProposal = async () => {
    await axios.post('/api/daoProposal', { proposer: address, description: proposal });
    alert('Proposal submitted');
  };

  return (
    <div className="p-4 space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Your wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Amount (in wei)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Proposal description"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
      />

      <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleMint}>
        Mint Tokens
      </button>
      <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleStake}>
        Stake Tokens
      </button>
      <button className="bg-purple-500 text-white p-2 rounded w-full" onClick={handleProposal}>
        Submit DAO Proposal
      </button>
    </div>
  );
};

export default DashboardActions;
