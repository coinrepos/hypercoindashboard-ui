import React from 'react';
import { useContractEvents } from '../../hooks/useContractEvents';
import TREASURY_ABI from '../../contracts/Treasury.json';

export default function TreasuryTracker({ treasuryAddress }) {
  const { events } = useContractEvents(treasuryAddress, TREASURY_ABI, 'Deposit');

  return (
    <div className="treasury-tracker">
      <h3>Recent Deposits:</h3>
      <ul>
        {events.map((event, i) => (
          <li key={i}>{event.args.amount} ETH</li>
        ))}
      </ul>
    </div>
  );
}