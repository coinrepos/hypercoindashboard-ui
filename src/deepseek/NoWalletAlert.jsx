import React from 'react';

export default function NoWalletAlert() {
  return (
    <div className="wallet-alert">
      <h3>⚠️ Wallet Not Connected</h3>
      <p>Install MetaMask to use this dashboard.</p>
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Get MetaMask
      </a>
    </div>
  );
}