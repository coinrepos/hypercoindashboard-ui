// src/BridgeBTCWatcher.js
import axios from "axios";

const BTC_ADDRESS = "bc1q5lnjr4y2lfyee9gt9gfchcswcd8xg4zyjdmfknvqtjfcxcyxwhzqf4gjmt"; // Replace with yours
const POLL_INTERVAL_MS = 30000; // 30 seconds

const pollBTCDeposits = async () => {
  console.log("⏳ Polling BTC mempool & chain...");

  try {
    const response = await axios.get(`https://blockstream.info/api/address/${BTC_ADDRESS}/txs`);
    const txs = response.data;

    if (!txs.length) {
      console.log("📭 No transactions found yet.");
      return;
    }

    txs.forEach((tx) => {
      const amount = tx.vout
        .filter((v) => v.scriptpubkey_address === BTC_ADDRESS)
        .reduce((sum, v) => sum + v.value, 0);

      if (amount > 0) {
        console.log(`✅ Deposit found: ${amount / 1e8} BTC (TXID: ${tx.txid})`);
      }
    });
  } catch (err) {
    console.error("❌ Error polling BTC deposits:", err.message);
  }
};

setInterval(pollBTCDeposits, POLL_INTERVAL_MS);
pollBTCDeposits();
