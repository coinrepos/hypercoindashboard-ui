// src/components/HyperCoinConverter.jsx
import React, { useState, useEffect } from 'react';

const HyperCoinConverter = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState('');
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => setBtcPrice(data.bitcoin.usd))
      .catch(err => console.error('Failed to fetch BTC price:', err));
  }, []);

  useEffect(() => {
    if (btcPrice && usdAmount) {
      const ethPerUsd = 0.00039604; // Fixed ETH/USD rate
      const wei = ethPerUsd * parseFloat(usdAmount) * 1e18;
      setConverted(wei.toString());
    }
  }, [btcPrice, usdAmount]);

  return (
    <div style={{ background: '#1e293b', padding: '1rem', marginTop: '2rem', borderRadius: '8px' }}>
      <h3>🔄 HyperCoin Converter</h3>
      <p>1 BTC = ${btcPrice ?? '...'} USD</p>
      <input
        type="number"
        placeholder="Amount in USD"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        style={{ padding: '0.5rem', width: '60%' }}
      />
      {converted && (
        <p style={{ marginTop: '10px' }}>
          ≈ {converted} wei (HYPER equivalent)
        </p>
      )}
    </div>
  );
};

export default HyperCoinConverter;
