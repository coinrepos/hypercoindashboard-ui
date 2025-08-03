import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const HyperCoinConverter = () => {
  const [usdAmount, setUsdAmount] = useState('');
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState('');

  const convertToWei = async () => {
    try {
      setError('');
      const res = await axios.get(`${API_BASE_URL}/api/convert/usd-to-wei?usd=${usdAmount}`);
      setConverted(res.data.wei);
    } catch (err) {
      setError('Conversion failed. Ensure the backend is running.');
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '1rem', marginTop: '2rem', borderRadius: '8px' }}>
      <h3>🔄 HyperCoin Converter</h3>
      <input
        type="number"
        placeholder="Amount in USD"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        style={{ padding: '0.5rem', width: '60%' }}
      />
      <button onClick={convertToWei} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Convert
      </button>

      {converted && (
        <p style={{ marginTop: '10px', color: '#4ade80' }}>
          ≈ {converted} wei (HYPER equivalent)
        </p>
      )}
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
    </div>
  );
};

export default HyperCoinConverter;
