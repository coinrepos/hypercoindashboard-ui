// src/components/KredsCoinConverter.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
const TREASURY_ADDRESS = '0xb83b08bd688739dcf499091B7596931c2DD8835F';
const KREDS_TO_RBTC_RATIO = 1;
const RSK_CHAIN_ID = 30;

const KredsCoinConverter = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [converted, setConverted] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState(null);

  // Initialize provider for RSK network
  useEffect(() => {
    const initProvider = async () => {
      try {
        // Connect to RSK network
        const rskProvider = new ethers.providers.JsonRpcProvider({
          url: 'https://public-node.rsk.co',
          chainId: RSK_CHAIN_ID,
          name: 'rsk-mainnet'
        });
        setProvider(rskProvider);
      } catch (err) {
        console.error('Error initializing RSK provider:', err);
        setStatus('❌ Error connecting to RSK network');
      }
    };
    initProvider();
  }, []);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (err) {
        console.error('Failed to fetch BTC price:', err);
        setStatus('⚠️ Using fallback BTC price ($50,000)');
        setBtcPrice(50000);
      }
    };
    fetchBtcPrice();
  }, []);

  useEffect(() => {
    if (btcPrice && usdAmount && !isNaN(usdAmount)) {
      const kredsPerUsd = KREDS_TO_RBTC_RATIO / btcPrice;
      const kredsUnits = kredsPerUsd * parseFloat(usdAmount) * 1e18;
      setConverted(kredsUnits.toString());
    }
  }, [btcPrice, usdAmount]);

  const validateAddress = async (address) => {
    try {
      // Basic address validation first
      if (!ethers.utils.isAddress(address)) {
        return false;
      }
      
      // RSK-specific checks
      if (provider) {
        const code = await provider.getCode(address);
        return code !== '0x';
      }
      return true;
    } catch (err) {
      console.error('Address validation error:', err);
      return false;
    }
  };

  const handleConvert = async () => {
    if (!fromAddress || !usdAmount || isNaN(usdAmount)) {
      setStatus('❌ Please enter valid address and amount');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('🔄 Validating address...');
      
      // Validate RSK address (not ENS)
      const isValid = await validateAddress(fromAddress);
      if (!isValid) {
        throw new Error('Invalid RSK address format');
      }

      setStatus('🔄 Converting USD to KREDS...');
      const res = await axios.post(`${API_BASE_URL}/convert`, {
        from: fromAddress,
        to: TREASURY_ADDRESS,
        amount: converted,
        currency: 'KREDS',
        usdAmount: parseFloat(usdAmount),
        chainId: RSK_CHAIN_ID
      });

      setStatus(`✅ Success!\n${usdAmount} USD → ${(usdAmount/btcPrice).toFixed(8)} rBTC worth of KREDS\nTx Hash: ${res.data.tx_hash}`);
    } catch (err) {
      console.error('Conversion error:', err);
      let errorMsg = err.message;
      
      // Handle specific ENS error
      if (err.code === 'UNSUPPORTED_OPERATION' && err.operation === 'getEnsAddress') {
        errorMsg = 'ENS domains not supported on RSK. Please use a direct RSK address (0x...)';
      }
      
      setStatus(`❌ Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="converter-container">
      <h3>🔄 KREDS Converter (RSK Network)</h3>
      <div className="network-badge">Chain ID: {RSK_CHAIN_ID} (RSK Mainnet)</div>
      
      <div className="price-display">
        <p>1 rBTC = ${btcPrice ? btcPrice.toLocaleString() : 'loading...'} USD</p>
        <p>1 KREDS = {btcPrice ? `$${(btcPrice/KREDS_TO_RBTC_RATIO).toFixed(6)}` : 'loading...'}</p>
      </div>
      
      <div className="input-group">
        <label>Your RSK Address (0x...):</label>
        <input
          type="text"
          placeholder="0x..."
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          disabled={isLoading}
        />
        <small className="input-note">ENS domains not supported on RSK</small>
      </div>
      
      <div className="input-group">
        <label>Amount in USD:</label>
        <input
          type="number"
          placeholder="100.00"
          value={usdAmount}
          onChange={(e) => setUsdAmount(e.target.value)}
          disabled={isLoading}
          min="0"
          step="0.01"
        />
      </div>

      {converted && btcPrice && (
        <div className="conversion-result">
          <p>≈ {(usdAmount/btcPrice).toFixed(8)} rBTC</p>
          <p>= {(usdAmount/(btcPrice/KREDS_TO_RBTC_RATIO)).toFixed(2)} KREDS</p>
          <small>({converted} raw units)</small>
        </div>
      )}

      <div className="treasury-info">
        <p>Funds will be sent to:</p>
        <code>{TREASURY_ADDRESS}</code>
      </div>

      <button 
        onClick={handleConvert} 
        disabled={isLoading || !fromAddress || !usdAmount || !provider}
      >
        {isLoading ? 'Processing...' : `Convert to KREDS`}
      </button>

      {status && <div className={`status-message ${status.includes('❌') ? 'error' : ''}`}>{status}</div>}

      <style jsx>{`
        .converter-container {
          background: #1a1a2e;
          padding: 1.5rem;
          border-radius: 12px;
          color: white;
          max-width: 500px;
          margin: 2rem auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          font-family: 'Arial', sans-serif;
          position: relative;
        }
        
        .network-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #6a4c93;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        
        .price-display {
          background: rgba(106, 76, 147, 0.2);
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        
        .input-group {
          margin-bottom: 1rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.3rem;
          color: #b8a9d4;
        }
        
        .input-note {
          color: #a0a0c0;
          font-size: 0.8rem;
          display: block;
          margin-top: 0.3rem;
        }
        
        input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #4a4a8a;
          background: #16213e;
          color: white;
        }
        
        button {
          width: 100%;
          padding: 0.75rem;
          background: #6a4c93;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 1rem;
        }
        
        button:hover:not(:disabled) {
          background: #8a6cbb;
        }
        
        button:disabled {
          background: #3a3a5a;
          cursor: not-allowed;
        }
        
        .conversion-result {
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(106, 76, 147, 0.1);
          border-radius: 6px;
          border-left: 3px solid #6a4c93;
        }
        
        .treasury-info {
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(22, 33, 62, 0.5);
          border-radius: 6px;
        }
        
        .treasury-info code {
          word-break: break-all;
          display: inline-block;
          margin-top: 0.5rem;
          color: #4ade80;
        }
        
        .status-message {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 6px;
          background: #1a3a1e;
          white-space: pre-line;
        }
        
        .status-message.error {
          background: #4a1c40;
        }
      `}</style>
    </div>
  );
};

export default KredsCoinConverter;