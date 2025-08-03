import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWeb3() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkWallet();
  }, []);

  return { account };
}