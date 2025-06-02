// extract.js
const fs = require("fs");
const path = require("path");

const artifactPath = path.join(__dirname, "artifacts/contracts/FlattenedWrappedHyperCoin.sol/WrappedHyperCoin.json");

if (!fs.existsSync(artifactPath)) {
  console.error("❌ ABI/bytecode artifact not found at expected path:", artifactPath);
  process.exit(1);
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const abi = JSON.stringify(artifact.abi, null, 2);
const bytecode = artifact.bytecode;

// Save ABI and Bytecode
fs.writeFileSync("abi.json", abi);
fs.writeFileSync("bytecode.txt", bytecode);

console.log("✅ ABI and Bytecode successfully extracted and saved as abi.json and bytecode.txt.");
