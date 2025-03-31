// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard.jsx";
import BridgeUI from "./BridgeUI.jsx";
import DAOVoting from "./DAOVoting.jsx";
import StockCoinMintForm from "./StockCoinMintForm.jsx";
import HyperSwap from "./HyperSwap.jsx";
import InsurancePool from "./InsurancePool.jsx";

import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WrappedHyperCoinDashboard />} />
        <Route path="/bridge" element={<BridgeUI />} />
        <Route path="/dao" element={<DAOVoting />} />
        <Route path="/stock" element={<StockCoinMintForm />} />
        <Route path="/swap" element={<HyperSwap />} />
        <Route path="/insurance" element={<InsurancePool />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
