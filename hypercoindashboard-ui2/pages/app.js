import React, { useState } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const [mintAddress, setMintAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [mintResult, setMintResult] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL;

  const getWallet = async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/getWallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Wallet fetch failed');
      setWallet(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getBalance = async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/getBalance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Balance fetch failed');
      setBalance(data.balance);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMint = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/mint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: mintAddress, amount: mintAmount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Minting failed');
      setMintResult(data);
    } catch (err) {
      setError('Mint failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🪙 Hypercoin Wallet Dashboard</h1>

      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={getWallet} style={{ marginRight: '1rem' }}>
        Get Wallet
      </button>
      <button onClick={getBalance}>Get Balance</button>

      {wallet && (
        <div>
          <h3>Wallet Info:</h3>
          <pre>{JSON.stringify(wallet, null, 2)}</pre>
        </div>
      )}

      {balance !== null && (
        <div>
          <h3>Balance: {balance}</h3>
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>Mint Tokens</h2>
      <input
        type="text"
        placeholder="Recipient address"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginBottom: '1rem', display: 'block' }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginBottom: '1rem', display: 'block' }}
      />
      <button onClick={handleMint}>Mint</button>

      {mintResult && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Mint Result:</h4>
          <pre>{JSON.stringify(mintResult, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>⚠️ Error: {error}</p>}
    </div>
  );
}

export default App;
