// src/components/LiquidityControls.jsx
import React from "react";

const LiquidityControls = ({ onAddLiquidity, onCheckLiquidity }) => {
  return (
    <div className="liquidity-controls">
      <button onClick={onAddLiquidity}>💧 Add Liquidity</button>
      <button onClick={onCheckLiquidity}>🔍 Check Liquidity</button>
    </div>
  );
};

export default LiquidityControls;
