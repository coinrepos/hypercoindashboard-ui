// backend/ipfsUploader.js
const fs = require("fs");
const path = require("path");
const { create } = require("ipfs-http-client");

// 🔐 You can connect to local IPFS or Infura (Cloud)
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

async function uploadToIPFS(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const result = await ipfs.add({ path: fileName, content: fileStream });

    console.log(`📡 IPFS Upload Success: ${fileName}`);
    console.log(`🔗 IPFS Hash: ${result.cid}`);
    return result.cid.toString();
  } catch (err) {
    console.error(`❌ IPFS Upload Failed for ${filePath}`, err.message);
    return null;
  }
}

module.exports = { uploadToIPFS };
