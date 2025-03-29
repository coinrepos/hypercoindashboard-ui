// src/scripts/AutomationEngine.js
import fs from "fs";
import axios from "axios";
import path from "path";
import cron from "node-cron";

const IPFS_UPLOAD_URL = "https://api.web3.storage/upload"; // Replace if needed
const IPFS_API_KEY = process.env.IPFS_API_KEY || "YOUR_API_KEY"; // Secure this in prod

const FILES_DIR = path.resolve("src", "queue"); // Queue files to be uploaded
const SNAPSHOT_DIR = path.resolve("backups");  // Where backups will be saved

// 🧱 Utility: Upload to IPFS
const uploadToIPFS = async (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  const res = await axios.post(IPFS_UPLOAD_URL, fileData, {
    headers: {
      "Authorization": `Bearer ${IPFS_API_KEY}`,
      "Content-Type": "application/octet-stream",
      "X-NAME": fileName
    }
  });

  return res.data.cid || "unknown";
};

// 🧠 Task: Snapshot All Queue Files
const runSnapshot = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotPath = path.join(SNAPSHOT_DIR, `snapshot-${timestamp}.zip`);

  if (!fs.existsSync(SNAPSHOT_DIR)) fs.mkdirSync(SNAPSHOT_DIR);

  const zip = require("adm-zip")();
  fs.readdirSync(FILES_DIR).forEach(file => {
    const fullPath = path.join(FILES_DIR, file);
    zip.addLocalFile(fullPath);
  });

  zip.writeZip(snapshotPath);
  console.log(`🧬 Snapshot saved: ${snapshotPath}`);
};

// 🚀 Task: Scheduled Uploads
const scanAndUploadQueue = async () => {
  console.log("📡 Scanning queue...");
  const files = fs.readdirSync(FILES_DIR);

  for (const file of files) {
    const fullPath = path.join(FILES_DIR, file);
    try {
      const cid = await uploadToIPFS(fullPath);
      console.log(`✅ Uploaded ${file} to IPFS: ${cid}`);
    } catch (err) {
      console.error(`❌ Failed upload for ${file}:`, err.message);
    }
  }
};

// 🕓 Cron Jobs
cron.schedule("*/5 * * * *", scanAndUploadQueue); // Every 5 mins
cron.schedule("0 */1 * * *", runSnapshot);        // Every hour

console.log("🤖 AutomationEngine.js active - watching queue and syncing IPFS");

// Run once on init
scanAndUploadQueue();
