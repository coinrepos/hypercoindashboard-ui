import React from 'react';
import { useContractRead } from '../../hooks/useContractRead';
import STOCKCOIN_ABI from '../../contracts/StockCoin.json';

export default function StockCoinExchange({ stockCoinAddress }) {
  const { data: price } = useContractRead(stockCoinAddress, STOCKCOIN_ABI, 'getPrice');

  return (
    <div className="stock-exchange">
      <h3>StockCoin Price: {price} ETH</h3>
    </div>
  );
}