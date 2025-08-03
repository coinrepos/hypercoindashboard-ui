import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const SetLock = () => {
  const [lockAddress, setLockAddress] = useState('');
  const [response, setResponse] = useState('');

  const handleSetLock = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/setLockContract`, {
        lock_address: lockAddress
      });
      setResponse(`✅ Lock contract set: ${res.data.tx_hash}`);
    } catch (err) {
      setResponse(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>🔐 Set Lock Contract</h3>
      <input
        type="text"
        placeholder="Lock Contract Address"
        value={lockAddress}
        onChange={(e) => setLockAddress(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleSetLock} style={{ background: '#3b82f6', color: '#fff', padding: '0.5rem 1rem' }}>
        Submit
      </button>
      <p>{response}</p>
    </div>
  );
};

export default SetLock;
