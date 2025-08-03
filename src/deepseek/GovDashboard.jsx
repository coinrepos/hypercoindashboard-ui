import React from 'react';
import { useContractRead } from '../hooks/useContractRead';
import GOV_ABI from '../contracts/Governance.json';

export default function GovDashboard({ govAddress }) {
  const { data: stats } = useContractRead(govAddress, GOV_ABI, 'getGovernanceStats');

  return (
    <div className="gov-dashboard">
      <h3>🏛 Governance Dashboard</h3>
      <div className="stats">
        <p>Active Proposals: <strong>{stats?.activeProposals}</strong></p>
        <p>Total Voters: <strong>{stats?.totalVoters}</strong></p>
        <p>Quorum: <strong>{stats?.quorumPercentage}%</strong></p>
      </div>
    </div>
  );
}