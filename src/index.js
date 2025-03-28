// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard";
import BridgeUI from "./BridgeUI";
import DAOVoting from "./DAOVoting";
import StockCoinMintForm from "./StockCoinMintForm";
import HyperSwap from "./HyperSwap";

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
      </Routes>
    </Router>
  </React.StrictMode>
);
