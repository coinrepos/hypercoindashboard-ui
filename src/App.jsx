// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard";
import StockCoinMintForm from "./StockCoinMintForm";
import DAOVoting from "./DAOVoting";
import HyperSwap from "./HyperSwap";
import BridgeUI from "./BridgeUI";
import InsurancePool from "./InsurancePool"; // ← optional UI to be provided if not yet built

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
