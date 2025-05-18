import React, { useState } from 'react';
import axios from 'axios';

const WrappedHyperCoinDashboard = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [lockAddress, setLockAddress] = useState('');
  const [response, setResponse] = useState('');

  const handleMint = async () => {
    try {
      const res = await axios.post('http://localhost:5000/mint', {
        to: address,
        amount: amount
      });
      setResponse(res.data.tx_hash);
    } catch (err) {
      setResponse('Mint error: ' + err.message);
    }
  };

  const handleBurn = async () => {
    try {
      const res = await axios.post('http://localhost:5000/burn', {
        amount: amount
      });
      setResponse(res.data.tx_hash);
    } catch (err) {
      setResponse('Burn error: ' + err.message);
    }
  };

  const handleSetLock = async () => {
    try {
      const res = await axios.post('http://localhost:5000/setLockContract', {
        lock_address: lockAddress
      });
      setResponse(res.data.tx_hash);
    } catch (err) {
      setResponse('Set Lock error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Wrapped HyperCoin Dashboard</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Amount (wei)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button onClick={handleMint}>Mint</button>
      <button onClick={handleBurn} style={{ marginLeft: '10px' }}>Burn</button>
      <br /><br />
      <input
        type="text"
        placeholder="Lock Contract Address"
        value={lockAddress}
        onChange={(e) => setLockAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button onClick={handleSetLock}>Set Lock Contract</button>
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{response}</div>
    </div>
  );
};

export default WrappedHyperCoinDashboard;
