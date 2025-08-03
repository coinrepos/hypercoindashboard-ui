import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useContract(address, abi) {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    setContract(new ethers.Contract(address, abi, signer));
  }, [address, abi]);

  return contract;
}