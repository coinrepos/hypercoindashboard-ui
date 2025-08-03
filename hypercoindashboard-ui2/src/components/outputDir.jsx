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

const outputDir = path.join(__dirname, "extracted");

// 📁 Create dir if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true }); // recursive just in case
}

fs.writeFileSync(path.join(outputDir, "abi.json"), abi);
fs.writeFileSync(path.join(outputDir, "bytecode.txt"), bytecode);

console.log("✅ ABI and Bytecode successfully saved to 'extracted' directory.");
