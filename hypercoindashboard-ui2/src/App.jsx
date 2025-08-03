import React, { useState } from "react";
import SidebarNav from "./SidebarNav";
import Dashboard from "./Dashboard";
import TreasuryTracker from "./TreasuryTracker";
import ValidatorRoyalties from "./ValidatorRoyalties";
import { ValidatorMatrix, ValidatorRank, ValidatorProfitTracker } from "./components/validators";
import "./App.css"; // Assuming global styles

export default function App() {
  const [route, setRoute] = useState("Dashboard");

  const renderRoute = () => {
    switch (route) {
      case "Dashboard":
        return <Dashboard />;
      case "TreasuryTracker":
        return <TreasuryTracker />;
      case "Validator Profits":
        return (
          <>
            <ValidatorProfitTracker />
            <ValidatorRoyalties />
            <ValidatorMatrix />
            <ValidatorRank />
          </>
        );
      // Add more case blocks for other routes (Portfolio, Exchange, etc.)
      default:
        return <h2 style={{ color: "#fff" }}>404 – Page Not Found</h2>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarNav onRouteChange={setRoute} />
      <main style={{ flex: 1, padding: "2rem", backgroundColor: "#0f172a", minHeight: "100vh" }}>
        {renderRoute()}
      </main>
    </div>
  );
}
