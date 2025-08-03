// components/LiquidityControls.jsx

import React, { useState } from 'react';

const LiquidityControls = () => {
  const [formData, setFormData] = useState({
    tokenA: '',
    tokenB: '',
    amountA: '',
    amountB: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLiquidity = async () => {
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/addLiquidity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) setStatus(`✅ TX Hash: ${data.txHash}`);
      else throw new Error(data.error);
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  const handleCheckLiquidity = async () => {
    setStatus('Checking liquidity...');
    try {
      const res = await fetch('/api/checkLiquidity');
      const data = await res.json();
      if (res.ok) {
        setStatus(`🔎 Reserves: Token A - ${data.tokenA}, Token B - ${data.tokenB}`);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="liquidity-controls">
      <h2>💧 Liquidity Pool Management</h2>
      <input name="tokenA" placeholder="Token A Address" onChange={handleChange} />
      <input name="tokenB" placeholder="Token B Address" onChange={handleChange} />
      <input name="amountA" placeholder="Amount A" onChange={handleChange} />
      <input name="amountB" placeholder="Amount B" onChange={handleChange} />
      <button onClick={handleAddLiquidity}>Add Liquidity</button>
      <button onClick={handleCheckLiquidity}>Check Liquidity</button>
      <p>{status}</p>
    </div>
  );
};

export default LiquidityControls;
