// WrappedHyperCoinDashboard.js (corrected for ethers v5 compatibility)
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi/wrappedHyperCoinABI.json';

const WrappedHyperCoinDashboard = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [lockAddress, setLockAddress] = useState('');
  const [response, setResponse] = useState('');
  const [btcPrice, setBtcPrice] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const contractAddress = '0xb83b08bd688739dcf499091b7596931c2dd8835f';

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const tempSigner = tempProvider.getSigner();
        const tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
        setProvider(tempProvider);
        setSigner(tempSigner);
        setContract(tempContract);
        setWalletConnected(true);
      } catch (error) {
        console.error('Wallet connection error:', error);
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  const handleMint = async () => {
    if (!contract || !address || !amount) return;
    try {
      const usdToWei = ethers.utils.parseUnits((amount / btcPrice).toString(), 'ether');
      const tx = await contract.mint(address, usdToWei);
      await tx.wait();
      setResponse('Minted successfully');
    } catch (err) {
      setResponse('Minting failed: ' + err.message);
    }
  };

  const handleBurn = async () => {
    if (!contract || !amount) return;
    try {
      const usdToWei = ethers.utils.parseUnits((amount / btcPrice).toString(), 'ether');
      const tx = await contract.burn(usdToWei);
      await tx.wait();
      setResponse('Burned successfully');
    } catch (err) {
      setResponse('Burning failed: ' + err.message);
    }
  };

  const handleSetLock = async () => {
    if (!contract || !lockAddress) return;
    try {
      const tx = await contract.setLockContract(lockAddress);
      await tx.wait();
      setResponse('Lock contract set successfully');
    } catch (err) {
      setResponse('Setting lock failed: ' + err.message);
    }
  };

  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then(res => res.json())
      .then(data => {
        const price = parseFloat(data.bpi.USD.rate.replace(',', ''));
        setBtcPrice(price);
      });
  }, []);

  useEffect(() => {
    if (btcPrice && amount) {
      const usdToWei = ethers.utils.parseUnits((amount / btcPrice).toString(), 'ether');
      setConvertedAmount(usdToWei.toString());
    }
  }, [btcPrice, amount]);

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

export default WrappedHyperCoinDashboard;
