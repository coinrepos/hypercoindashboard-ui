// src/App.js
import React from "react";
import WrappedHyperCoinDashboard from "./WrappedHyperCoinDashboard";
import { APP_NAME } from "./config";

function App() {
  return (
    <div>
      <h1 style={{ padding: "1rem", fontSize: "1.5rem", color: "#fff" }}>
        🧠 Welcome to {APP_NAME}
      </h1>
      <WrappedHyperCoinDashboard />
    </div>
  );
}

export default App;
