import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard.js";
import StockCoinMintForm from "./StockCoinMintForm.js";
import DAOVoting from "./DAOVoting.js";
import HyperSwap from "./HyperSwap.js";
import BridgeUI from "./BridgeUI.js";
import InsurancePool from "./InsurancePool.js"; // Optional UI

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WrappedHyperCoinDashboard />} />
        <Route path="/mint" element={<StockCoinMintForm />} />
        <Route path="/dao" element={<DAOVoting />} />
        <Route path="/swap" element={<HyperSwap />} />
        <Route path="/bridge" element={<BridgeUI />} />
        <Route path="/insurance" element={<InsurancePool />} />
      </Routes>
    </Router>
  );
}

export default App;
