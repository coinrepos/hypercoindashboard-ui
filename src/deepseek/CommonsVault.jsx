import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import VAULT_ABI from '../../contracts/CommonsVault.json';

export default function CommonsVault({ vaultAddress }) {
  const { data: vaultBalance } = useContractRead(vaultAddress, VAULT_ABI, 'getBalance');

  return (
    <div className="vault">
      <h3>Vault Balance: {ethers.formatEther(vaultBalance)} ETH</h3>
    </div>
  );
}