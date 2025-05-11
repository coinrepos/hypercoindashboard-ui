// src/index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard.jsx";
import BridgeUI from "./BridgeUI.jsx";
import DAOVoting from "./DAOVoting.jsx";
import StockCoinMintForm from "./StockCoinMintForm.jsx";
import HyperSwap from "./HyperSwap.jsx";

import { PrivacyProvider } from "./hooks/usePrivacyMode.js";
import { HyperBotProvider } from "./HyperBotContext.jsx";

import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrivacyProvider>
      <HyperBotProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WrappedHyperCoinDashboard />} />
            <Route path="/bridge" element={<BridgeUI />} />
            <Route path="/dao" element={<DAOVoting />} />
            <Route path="/stock" element={<StockCoinMintForm />} />
            <Route path="/swap" element={<HyperSwap />} />
          </Routes>
        </Router>
      </HyperBotProvider>
    </PrivacyProvider>
  </React.StrictMode>
);
