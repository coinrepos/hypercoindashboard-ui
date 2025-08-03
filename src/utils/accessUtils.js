// src/utils/accessUtils.js
import { ethers } from "ethers";
import DAO_ABI from "../contracts/HyperCoinDAO.json";
import Treasury_ABI from "../contracts/TreasuryControls.json";

const DAO_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";
const TREASURY_ADDRESS = "0x83b08bd688739dcf499091B7596931c2DD8835F";

export async function checkAccess(walletAddress, contractType = "dao") {
  if (!walletAddress) return false;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(
    contractType === "treasury" ? TREASURY_ADDRESS : DAO_ADDRESS,
    contractType === "treasury" ? Treasury_ABI.abi : DAO_ABI.abi,
    provider
  );

  try {
    if (contractType === "treasury") {
      const isAuthorized = await contract.authorizedCaller(walletAddress);
      return isAuthorized === true;
    } else {
      const owner = await contract.owner();
      return owner.toLowerCase() === walletAddress.toLowerCase();
    }
  } catch (e) {
    console.warn("Access check failed:", e);
    return false;
  }
}
