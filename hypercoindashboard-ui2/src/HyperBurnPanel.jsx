import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function HyperBurnPanel() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = async () => {
    try {
      setIsBurning(true);
      setStatus('⏳ Sending burn request...');

      const res = await axios.post(`${API_BASE_URL}/burn`, {
        amount: amount.toString()
      });

      setStatus(`✅ Burn complete: ${res.data.tx_hash}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Burn failed');
    } finally {
      setIsBurning(false);
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
      <h3>🔥 HyperBurnPanel</h3>
      <input
        type="number"
        placeholder="Amount to burn"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button
        onClick={handleBurn}
        disabled={!amount || isBurning}
        style={{
          backgroundColor: isBurning ? '#94a3b8' : '#ef4444',
          padding: '0.5rem 1rem',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        🔥 {isBurning ? 'Burning...' : 'Burn Now'}
      </button>
      <p style={{ marginTop: '1rem' }}>{status}</p>
    </div>
  );
}
