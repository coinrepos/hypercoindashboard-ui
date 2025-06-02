import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://hypercoin-api.vercel.app';

const HyperBurn = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleBurn = async () => {
    try {
      setStatus('⏳ Sending burn request...');
      const res = await axios.post(`${API_BASE_URL}/burn`, { amount });
      setStatus(`✅ Burn successful: ${res.data.tx_hash}`);
    } catch (err) {
      setStatus(`❌ Burn failed: ${err.message}`);
    }
  };

  const clearFields = () => {
    setAmount('');
    setStatus('');
  };

  return (
    <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
      <h3>🔥 Burn HyperCoin</h3>
      <input
        type="text"
        placeholder="Amount to burn (in wei)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <div>
        <button onClick={handleBurn} style={{ background: '#ef4444', color: '#fff', padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
          🚀 Burn Now
        </button>
        <button onClick={clearFields} style={{ padding: '0.5rem 1rem' }}>
          🔄 Clear
        </button>
      </div>
      <p>{status}</p>
    </div>
  );
};

export default HyperBurn;
