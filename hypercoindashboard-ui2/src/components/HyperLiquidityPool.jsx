import React, { useState } from 'react';
import axios from 'axios';

export default function HyperLiquidityPool() {
  const [tokenA, setTokenA] = useState('');
  const [tokenB, setTokenB] = useState('');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [status, setStatus] = useState('');

  const handleAddLiquidity = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addLiquidity`, {
        tokenA,
        tokenB,
        amountA,
        amountB
      });
      setStatus(res.data.tx_hash);
    } catch (err) {
      setStatus('Add liquidity failed: ' + err.message);
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
      <h3>💧 Add Liquidity</h3>
      <input placeholder="Token A Address" value={tokenA} onChange={e => setTokenA(e.target.value)} />
      <input placeholder="Token B Address" value={tokenB} onChange={e => setTokenB(e.target.value)} />
      <input type="number" placeholder="Amount A" value={amountA} onChange={e => setAmountA(e.target.value)} />
      <input type="number" placeholder="Amount B" value={amountB} onChange={e => setAmountB(e.target.value)} />
      <button onClick={handleAddLiquidity}>Add Liquidity</button>
      <p>{status}</p>
    </div>
  );
}
