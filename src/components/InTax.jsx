import React from "react";

export default function InTaxSwap({ onSwapComplete }) {
  return (
    <div>
      🔁 InTaxSwap Component
      <button onClick={onSwapComplete}>Execute Swap</button>
    </div>
  );
}
