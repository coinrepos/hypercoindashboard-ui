// backend/mirror-node.js
const fs = require("fs");
const path = require("path");

const SCHEDULE_DIR = path.join(__dirname, "scheduled");

function scanScheduledUploads() {
  fs.readdir(SCHEDULE_DIR, (err, files) => {
    if (err) {
      console.error("❌ MirrorNode error reading schedule dir:", err.message);
      return;
    }

    files.forEach((filename) => {
      const filePath = path.join(SCHEDULE_DIR, filename);

      fs.stat(filePath, (err, stats) => {
        if (err) return;

        // 🛰️ Log basic info — you can later sync this to distributed mirror storage
        console.log(`🛰️ Mirroring scheduled file: ${filename}`);
        console.log(`   📅 Created: ${stats.birthtime}`);
        console.log(`   💾 Size: ${stats.size} bytes`);
        console.log(`   📍 Local path: ${filePath}\n`);

        // 🔄 TODO: mirror sync logic to peer nodes, IPFS, or cold backup
      });
    });
  });
}

// ♻️ Auto run every 60 seconds
console.log("🔁 MirrorNode watcher started...");
setInterval(scanScheduledUploads, 60 * 1000);
