import React from "react";
import { Button } from "./components/ui/Button";
import { useHyperBot } from "./HyperBotContext";

// 🔐 SecureRun helper function
async function secureRun(file) {
  try {
    const response = await fetch("/api/secure-run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file,
        token: process.env.REACT_APP_SCRIPT_RUNNER_TOKEN
      })
    });

    const data = await response.json();
    alert(data.message || "✅ Script executed");
  } catch (err) {
    alert("❌ Failed to run script: " + err.message);
  }
}

export default function HyperBotAdminPanel() {
  const { isOnline } = useHyperBot();

  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">🛠️ HyperBot Admin Ops</h2>

      <div className="space-y-2">
        <Button onClick={() => secureRun("mintKitCoin.js")}>🪙 Mint KitCoin</Button>
        <Button onClick={() => secureRun("mintLuckyCoin.js")} className="ml-2">
          🍀 Mint LuckyCoin
        </Button>
        <Button onClick={() => secureRun("deployDAO.js")} className="ml-2">
          🏛 Deploy DAO
        </Button>
        <Button onClick={() => secureRun("triggerFreeze.js")} className="ml-2 bg-red-600 hover:bg-red-700">
          🧊 Trigger Freeze (Admin)
        </Button>
      </div>

      <div className="mt-4 text-sm text-yellow-300">
        Bot Status: {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>
    </div>
  );
}
