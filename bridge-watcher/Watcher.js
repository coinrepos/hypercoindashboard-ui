// bridge-watcher/watcher.js

import { pollBTCDeposits } from "../src/BridgeBTCWatcher.js";

// 🛰️ Start BTC scanning loop
console.log("🧠 HyperBridge BTC Watcher initialized...");

setInterval(() => {
  console.log("🔍 Checking for BTC deposits...");
  pollBTCDeposits();
}, 30000); // Every 30 seconds
