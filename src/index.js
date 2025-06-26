import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import KREDSDashboard from "./KREDSDashboard"; // No .jsx needed

import "./App.css";
import KREDSDAO from "./KREDSDAO"; // Add this import



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<KREDSDashboard />} />
		<Route path="/dao" element={<KREDSDAO />} /> // Add this route
      </Routes>
    </Router>
  </React.StrictMode>
);
