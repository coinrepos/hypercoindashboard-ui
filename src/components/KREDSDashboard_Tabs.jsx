import React, { useState } from "react";
import KREDSDAO from "./KREDSDAO";
import InTaxPanel from "./InTaxPanel";
import TreasuryPanel from "./TreasuryPanel";

export default function KREDSDashboardTabs() {
  const [activeTab, setActiveTab] = useState("dao");

  const tabStyles = (tab) =>
    `px-4 py-2 rounded-t-lg font-semibold cursor-pointer transition-all duration-150 ${
      activeTab === tab
        ? "bg-purple-700 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">KREDS Unified Dashboard</h1>

      <div className="flex justify-center mb-4 space-x-4">
        <button className={tabStyles("dao")} onClick={() => setActiveTab("dao")}>DAO</button>
        <button className={tabStyles("intax")} onClick={() => setActiveTab("intax")}>InTax</button>
        <button className={tabStyles("treasury")} onClick={() => setActiveTab("treasury")}>Treasury</button>
      </div>

      <div className="bg-gray-800 p-4 rounded shadow-xl max-w-5xl mx-auto">
        {activeTab === "dao" && <KREDSDAO />}
        {activeTab === "intax" && <InTaxPanel />}
        {activeTab === "treasury" && <TreasuryPanel />}
      </div>
    </div>
  );
}
