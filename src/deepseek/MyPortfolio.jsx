import React from 'react';
import { useContractRead } from '../hooks/useContractRead';
import PORTFOLIO_ABI from '../contracts/Portfolio.json';

export default function MyPortfolio({ portfolioAddress }) {
  const { data: assets } = useContractRead(portfolioAddress, PORTFOLIO_ABI, 'getUserAssets');

  return (
    <div className="portfolio">
      <h3>📊 My Portfolio</h3>
      <div className="assets-grid">
        {assets?.map((asset, i) => (
          <div key={i} className="asset-card">
            <h4>{asset.symbol}</h4>
            <p>Balance: {ethers.formatEther(asset.balance)}</p>
            <p>Value: {ethers.formatEther(asset.value)} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
}