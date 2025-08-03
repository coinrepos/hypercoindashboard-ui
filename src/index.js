import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/sonner";

import KREDSDashboard from "./KREDSDashboard";
import KREDSDAO from "./KREDSDAO";
import BurnUnlockZone from "./components/BurnUnlockZone";
import DAOTab from "./components/DAOTab";
import DAOTemplatePanel from "./components/DAOTemplatePanel";
import DAOVoting from "./components/DAOVoting";
import EscrowManager from "./components/EscrowManager";
import GlobalToggle from "./components/GlobalToggle";
import GoPrivateButton from "./components/GoPrivateButton";
import HackerDashboard from "./components/HackerDashboard";
import HyperBotAdminPanel from "./components/HyperBotAdminPanel";
import HyperBurn from "./components/HyperBurn";
import HyperSwap from "./components/HyperSwap";
import InTax from "./components/InTax";
import LiveFeedPanel from "./components/LiveFeedPanel";
import NetworkControlPanel from "./components/NetworkControlPanel";
import ResumeDashboard from "./components/ResumeDashboard";
import StockCoinMintForm from "./components/StockCoinMintForm";
import TreasuryControls from "./components/TreasuryControls";
import InTaxControls from "./components/InTaxControls";
import InTaxDashboard from "./components/InTaxDashboard";
import { HyperBotProvider } from "./HyperBotContext";
import "./App.css";
import logo from './logo.svg';

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <Router>
      <header className="flex items-center p-4 border-b">
        <img src={logo} alt="KREDS" className="logo mr-2" />
        <h1 className="text-xl font-bold">KREDS</h1>
      </header>
      <Routes>
        <Route path="/" element={<KREDSDashboard />} />
        <Route path="/dao" element={<KREDSDAO />} />
        <Route path="/burn" element={<BurnUnlockZone />} />
        <Route path="/dao-tab" element={<DAOTab />} />
        <Route path="/dao-template" element={<DAOTemplatePanel />} />
        <Route path="/dao-voting" element={<DAOVoting />} />
        <Route path="/escrow" element={<EscrowManager />} />
        <Route path="/global-toggle" element={<GlobalToggle />} />
        <Route path="/go-private" element={<GoPrivateButton />} />
        <Route path="/hacker" element={<HackerDashboard />} />
        <Route path="/admin-panel" element={<HyperBotAdminPanel />} />
        <Route path="/hyperburn" element={<HyperBurn />} />
        <Route path="/swap" element={<HyperSwap />} />
        <Route path="/intax" element={<InTax />} />
        <Route path="/live-feed" element={<LiveFeedPanel />} />
        <Route path="/network-control" element={<NetworkControlPanel />} />
        <Route path="/resume" element={<ResumeDashboard />} />
        <Route path="/mint-stockcoin" element={<StockCoinMintForm />} />
        <Route path="/treasury" element={<TreasuryControls />} />
        <Route path="/intax-dashboard" element={<InTaxDashboard />} />
        <Route path="/intax-controls" element={<InTaxControls />} />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HyperBotProvider>
        <App />
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </HyperBotProvider>
    </ThemeProvider>
  </React.StrictMode>
);
