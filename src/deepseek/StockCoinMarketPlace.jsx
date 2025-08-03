import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import STOCKCOIN_ABI from '../../contracts/StockCoin.json';

export default function StockCoinMarketplace({ stockCoinAddress }) {
  const [amount, setAmount] = useState('');
  const { contract } = useContract(stockCoinAddress, STOCKCOIN_ABI);

  const buyStockCoins = async () => {
    const tx = await contract.buy(ethers.parseEther(amount));
    await tx.wait();
    alert('Purchase successful!');
  };

  return (
    <div className="marketplace">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={buyStockCoins}>Buy StockCoins</button>
    </div>
  );
}