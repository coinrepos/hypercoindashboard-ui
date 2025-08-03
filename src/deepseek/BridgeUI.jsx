import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import BRIDGE_ABI from '../../contracts/Bridge.json';

export default function BridgeUI({ bridgeAddress }) {
  const [amount, setAmount] = useState('');
  const { contract } = useContract(bridgeAddress, BRIDGE_ABI);

  const bridgeTokens = async () => {
    const tx = await contract.bridge(ethers.parseEther(amount));
    await tx.wait();
    alert('Tokens bridged!');
  };

  return (
    <div className="bridge-ui">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={bridgeTokens}>Bridge</button>
    </div>
  );
}