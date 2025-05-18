import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const WrappedHyperCoinDashboardFull = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [lockAddress, setLockAddress] = useState('');
  const [response, setResponse] = useState('');
  const [btcPrice, setBtcPrice] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        const price = data.bitcoin.usd;
        setBtcPrice(price);
      })
      .catch(err => console.error('Failed to fetch BTC price:', err));
  }, []);

  useEffect(() => {
    if (btcPrice && amount) {
      const usdValue = parseFloat(amount);
      const btcPerUsd = 1 / btcPrice;
      const ethPerUsd = 0.00039604;
      const wei = ethPerUsd * usdValue * 1e18;
      setConvertedAmount(wei.toString());
    }
  }, [btcPrice, amount]);

  const handleMint = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/mint`, {
        to: address,
        amount: convertedAmount
      });
      setResponse(res.data.tx_hash);
    } catch (err) {
      setResponse('Mint error: ' + err.message);
    }
  };

  const handleBurn = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/burn`, {
        amount: convertedAmount
      });
      setResponse(res.data.tx_hash);
    } catch (err) {
      setResponse('Burn error: ' + err.message);
    }
  };

  const handleSetLock = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/setLockContract`, {
        lock_address: lockAddress
      });
      setResponse(res.data.tx_hash);
    } catch (err) {
      setResponse('Set Lock error: ' + err.message);
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } else {
        alert('MetaMask not found');
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#0f172a', color: '#fff' }}>
      <h1>🌐 HyperOS Full Dashboard</h1>

      <button onClick={connectWallet} style={{ background: '#22c55e', color: '#000', marginBottom: '1rem' }}>
        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>

      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleMint}>Mint</button>
      <button onClick={handleBurn} style={{ marginLeft: '10px' }}>Burn</button>
      <br /><br />
      <input
        type="text"
        placeholder="Lock Contract Address"
        value={lockAddress}
        onChange={(e) => setLockAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleSetLock}>Set Lock Contract</button>
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{response}</div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Admin Panel</h2>
      <p>🔐 Burn zone unlocked</p>
      <button onClick={() => alert('Burn executed (simulated)')}>🔥 Burn Reserve</button>
      <button onClick={() => alert('❌ SecureRun failed')}>MintLuckyCoin</button>
      <button onClick={() => alert('❌ SecureRun failed')}>MintKitCoin</button>
      <button onClick={() => alert('❌ SecureRun failed')}>Deploy DAO</button>
      <button onClick={() => alert('❌ SecureRun failed')}>Trigger Freeze</button>

      {btcPrice && (
        <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
          1 BTC = ${btcPrice} USD
        </div>
      )}
      {convertedAmount && (
        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
          Wei to send: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default WrappedHyperCoinDashboardFull;
