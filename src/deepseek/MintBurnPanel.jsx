import React from 'react';
import HyperMint from './HyperMint';
import HyperBurn from './HyperBurn';

export default function MintBurnPanel({ mintAddress, burnAddress }) {
  return (
    <div className="mint-burn-panel">
      <HyperMint mintAddress={mintAddress} />
      <HyperBurn burnAddress={burnAddress} />
    </div>
  );
}