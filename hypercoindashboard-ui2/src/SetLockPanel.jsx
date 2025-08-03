import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://hypercoin-bcklh7o3l-cryptobank.vercel.app';

const SetLockPanel = () => {
  const [lockAddress, setLockAddress] = useState('');
  const [response, setResponse] = useState('');

  const handleSetLock = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/setLockContract`, {
        lock_address: lockAddress
      });
      setResponse(`✅ Tx Hash: ${res.data.tx_hash}`);
    } catch (err) {
      setResponse('❌ Set lock failed: ' + err.message);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', background: '#1e293b', borderRadius: '8px' }}>
      <h3>🔒 Set Lock Contract</h3>
      <input
        type="text"
        placeholder="Lock contract address"
        value={lockAddress}
        onChange={(e) => setLockAddress(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem', width: '70%' }}
      />
      <button onClick={handleSetLock} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff' }}>
        Set Lock
      </button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default SetLockPanel;
