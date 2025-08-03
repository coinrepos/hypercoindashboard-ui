import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function LiveFeedPanel() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const provider = new ethers.WebSocketProvider(process.env.REACT_APP_WEBSOCKET_URL);
    provider.on('block', (block) => {
      provider.getBlockWithTransactions(block).then((blockData) => {
        setTransactions((prev) => [...blockData.transactions.slice(0, 5), ...prev.slice(0, 5)]);
      });
    });
    return () => provider.removeAllListeners();
  }, []);

  return (
    <div className="live-feed">
      <h3>📡 Live Network Activity</h3>
      <ul>
        {transactions.map((tx, i) => (
          <li key={i}>
            <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
              {tx.hash.slice(0, 10)}...{tx.hash.slice(-4)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}