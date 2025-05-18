// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard.jsx";
import StockCoinMintForm from "./StockCoinMintForm.jsx";
import DAOVoting from "./DAOVoting.jsx";
import HyperSwap from "./HyperSwap.jsx";
import BridgeUI from "./BridgeUI.jsx";
import InsurancePool from "./InsurancePool.jsx";

import { PrivacyProvider } from "./hooks/usePrivacyMode.js";
import { HyperBotProvider } from "./HyperBotContext.jsx";

export default function App() {
  return (
    <PrivacyProvider>
      <HyperBotProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WrappedHyperCoinDashboard />} />
            <Route path="/wrapped" element={<WrappedHyperCoinDashboard />} /> {/* ✅ Added */}
            <Route path="/mint" element={<StockCoinMintForm />} />
            <Route path="/dao" element={<DAOVoting />} />
            <Route path="/swap" element={<HyperSwap />} />
            <Route path="/bridge" element={<BridgeUI />} />
            <Route path="/insurance" element={<InsurancePool />} />
          </Routes>
        </Router>
      </HyperBotProvider>
    </PrivacyProvider>
  );
}
