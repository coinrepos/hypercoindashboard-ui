// src/App.jsx
import React from "react";
import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard.jsx";
import InTaxPanel from "./InTaxPanel";
// import MintBurnPanel from "./MintBurnPanel"; // ← Uncomment if needed

function App() {
  return (
    <div>
      <WrappedHyperCoinDashboard />
      <InTaxPanel />
      {/* <MintBurnPanel /> ← Optional */}
    </div>
  );
}

export default App;


