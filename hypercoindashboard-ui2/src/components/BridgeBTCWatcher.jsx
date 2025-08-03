import axios from "axios";

const BTC_ADDRESS = "bc1q5lnjr4y2lfyee9gt9gfchcswcd8xg4zyjdmfknvqtjfcxcyxwhzqf4gjmt"; // 🔗 Replace with your own
const POLL_INTERVAL_MS = 30000; // ⏱️ 30 seconds

/**
 * Poll the Bitcoin blockchain for incoming transactions to the specified address.
 */
const pollBTCDeposits = async () => {
  console.log("⏳ Polling BTC mempool & chain...");

  try {
    const res = await axios.get(`https://blockstream.info/api/address/${BTC_ADDRESS}/txs`);
    const transactions = res.data;

    if (!transactions || transactions.length === 0) {
      console.log("📭 No new transactions found.");
      return;
    }

    transactions.forEach((tx) => {
      const totalReceived = tx.vout
        .filter((v) => v.scriptpubkey_address === BTC_ADDRESS)
        .reduce((sum, v) => sum + v.value, 0);

      if (totalReceived > 0) {
        console.log(`✅ Deposit detected: ${(totalReceived / 1e8).toFixed(8)} BTC`);
        console.log(`🔗 TXID: ${tx.txid}`);
      }
    });
  } catch (error) {
    console.error("❌ Error while polling BTC network:", error.message);
  }
};

// Start polling loop
setInterval(pollBTCDeposits, POLL_INTERVAL_MS);
pollBTCDeposits(); // Initial immediate poll
