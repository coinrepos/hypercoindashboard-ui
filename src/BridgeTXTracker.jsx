import axios from "axios.js";

// 👇 Replace with BTC address(es) involved in your Changelly/FastBTC bridge
const btcAddresses = [
  "bc1q9vpusa6hgpjnymvdj52us20526wh942g9v4h66",
  "3PMYpbj5kJdQbos8FWDLbkvLoiauPPEoQH",
  "bc1qkgdanjxyh52ywayh2n8mle72a39x7m4pr7dvhx",
  "bc1qg5w0rqejkkagxeruy9lk3ttx2dw58m54pk2v99",
  "bc1qceye7thneluxxfhcn0ktj36uzv736j0g9qws6w",
  "3CRgsTPq7rnGtH17Y2aC5PQdYygocTjJVW",
  "bc1q867mzsf7u5qykyj09pvgh20pvncttsfw6w3frc"
];

async function checkBTCTransactions() {
  console.log("🔍 Scanning Blockstream for bridge TXs...");

  for (const address of btcAddresses) {
    try {
      const res = await axios.get(`https://blockstream.info/api/address/${address}/txs`);
      const txs = res.data;

      if (txs.length === 0) {
        console.log(`🚫 No TXs found for ${address}`);
        continue;
      }

      for (const tx of txs) {
        const txid = tx.txid;
        const outputs = tx.vout.map(v => ({
          value: v.value / 1e8,
          address: v.scriptpubkey_address
        }));

        console.log(`📦 TX: ${txid}`);
        outputs.forEach(o => {
          console.log(`   ↪️ Sent ${o.value} BTC → ${o.address}`);
        });
      }
    } catch (err) {
      console.error(`❌ Error fetching TXs for ${address}:`, err.message);
    }
  }
}

checkBTCTransactions();
