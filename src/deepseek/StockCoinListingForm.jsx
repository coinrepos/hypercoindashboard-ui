import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import EXCHANGE_ABI from '../../contracts/StockCoinExchange.json';

export default function StockCoinListingForm({ exchangeAddress }) {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const { contract } = useContract(exchangeAddress, EXCHANGE_ABI);

  const listStock = async () => {
    const tx = await contract.listStock(ticker, ethers.parseEther(price));
    await tx.wait();
    alert(`${ticker} listed!`);
  };

  return (
    <div className="listing-form">
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Ticker (e.g., AAPL)"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price (ETH)"
      />
      <button onClick={listStock}>List Stock</button>
    </div>
  );
}