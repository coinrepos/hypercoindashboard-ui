// src/SidebarNav.jsx
import React from "react";
import {
  APP_NAME,
  INTAX_NAME,
  ORGANIZATION_NAME,
  TOKEN_SYMBOL
} from "./config";

export default function SidebarNav({ onRouteChange }) {
  const routes = [
    "Dashboard",
    "My Portfolio",
    "StockCoin Exchange",
    "HyperSwap",
    "Validator Profits",
    `${INTAX_NAME} Burn Sim`,
    "DAO Voting",
    "SDSIS",
    "CommonsVault",
    "TreasuryTracker",
    "TreasuryRank",
  ];

  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: "1.5rem", color: "#fff" }}>🧠 {APP_NAME}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {routes.map((route) => (
          <li key={route} style={{ marginBottom: "1rem" }}>
            <button
              onClick={() => {
                onRouteChange(route);
                const sidebar = document.querySelector(".sidebar");
                if (window.innerWidth <= 768) {
                  sidebar.classList.remove("show-sidebar");
                }
              }}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#334155",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                textAlign: "left",
              }}
            >
              {route}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
