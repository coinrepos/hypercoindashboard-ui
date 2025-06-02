import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const HyperMintPanel = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [lockAddress, setLockAddress] = useState('');
  const [btcPrice, setBtcPrice] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => setBtcPrice(data.bitcoin.usd))
      .catch(err => console.error('❌ BTC price fetch failed:', err));
  }, []);

  useEffect(() => {
    if (btcPrice && amount) {
      const usd = parseFloat(amount);
      const ethPerUsd = 0.00039604; // your conversion factor
      const wei = ethPerUsd * usd * 1e18;
      setConvertedAmount(wei.toString());
    }
  }, [btcPrice, amount]);

  const handleMint = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/mint`, {
        to: address,
        amount: convertedAmount
      });
      setResponse(`✅ Mint tx: ${res.data.tx_hash}`);
    } catch (err) {
      setResponse('❌ Mint failed: ' + err.message);
    }
  };

  const handleBurn = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/burn`, {
        amount: convertedAmount
      });
      setResponse(`🔥 Burn tx: ${res.data.tx_hash}`);
    } catch (err) {
      setResponse('❌ Burn failed: ' + err.message);
    }
  };

  const handleSetLock = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/setLockContract`, {
        lock_address: lockAddress
      });
      setResponse(`🔐 Lock tx: ${res.data.tx_hash}`);
    } catch (err) {
      setResponse('❌ Lock failed: ' + err.message);
    }
  };

  const resetAll = () => {
    setAddress('');
    setAmount('');
    setLockAddress('');
    setResponse('');
  };

  return (
    <div style={{ background: '#0f172a', color: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <h2>🧬 HyperMint / Burn Panel</h2>
      <input
        type="text"
        placeholder="Recipient Wallet Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleMint}>🚀 Mint</button>
      <button onClick={handleBurn} style={{ marginLeft: '10px' }}>🔥 Burn</button>
      <br /><br />
      <input
        type="text"
        placeholder="Lock Contract Address"
        value={lockAddress}
        onChange={e => setLockAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleSetLock}>🔐 Set Lock</button>
      <button onClick={resetAll} style={{ marginLeft: '10px' }}>🔄 Reset</button>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{response}</div>
      {btcPrice && <p>💰 1 BTC = ${btcPrice}</p>}
      {convertedAmount && <p>🔁 Wei to send: {convertedAmount}</p>}
    </div>
  );
};

export default HyperMintPanel;
