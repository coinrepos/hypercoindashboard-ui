import KREDSAbi from "./contracts/KREDS.json";

const KREDS_ADDRESS = "0xe91aB7B3B810B7c40C0197DF87CcC6d2d02F73f8"; // Replace with your token address

const kreds = new ethers.Contract(KREDS_ADDRESS, KREDSAbi, signer);
