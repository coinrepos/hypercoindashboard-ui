import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import ROYALTY_ABI from '../contracts/RoyaltyPayment.json';

export default function RoyaltyPayment({ royaltyAddress }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { contract } = useContract(royaltyAddress, ROYALTY_ABI);

  const sendRoyalty = async () => {
    await contract.distributeRoyalty(
      recipient,
      ethers.parseEther(amount)
    );
    alert(`Royalty paid to ${recipient}`);
  };

  return (
    <div className="royalty-payment">
      <h3>💸 Send Royalty Payment</h3>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (ETH)"
      />
      <button onClick={sendRoyalty}>Pay Royalty</button>
    </div>
  );
}