import { ethers } from "ethers";
import InTaxABI from "../contracts/InTax.json";
import TreasuryABI from "../contracts/TreasuryControls.json";
import ShadowTokenABI from "../contracts/ShadowToken.json";

const IN_TAX_ADDRESS = "0x06a252c76Da8aC8eE73AcbB45e5509CDD99b9a6e";
const TREASURY_ADDRESS = "0x83b08bd688739dcf499091B7596931c2DD8835F";
const SHADOW_TOKEN_ADDRESS = "0xF3e87934D66bF742d4623e368B03D828162aB020"; // Replace with actual ShadowToken deployed address

export const executeTask = async (task, account) => {
  console.log("⚙️ Executing HyperBot task:", task.name, task.payload || "");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  switch (task.name) {
    case "DEPLOY_TOKEN":
      alert(`Deploying your ${task.payload?.type || "token"} contract...`);
      break;

    case "EXECUTE_DAO_LOGIC":
      alert(`Executing your DAO power: Proposal #${task.payload?.proposalId} → ${task.payload?.action}`);
      break;

    case "UNLOCK_BURN_ZONE":
      alert("🔓 Admin: Burn zone unlocked.");
      break;

    case "CHECK_MESH_VALIDATORS":
      alert("KRED network initiated...");
      // Simulate ISO storage preservation protocol trigger
      break;

    case "TRIGGER_RECALL_PROTOCOL":
      try {
        const shadow = new ethers.Contract(SHADOW_TOKEN_ADDRESS, ShadowTokenABI.abi, signer);
        await shadow.destroy();
        alert(" Token recall engaged. KREDS tracker initiated");
      } catch (err) {
        console.error("Recall failed:", err);
        alert(`❌ Recall protocol failed: ${err.message || "Unknown error occurred."}`);
      }
      break;

    case "RESUME_NETWORK":
      alert("✅ KREDS network connecting. Resuming sync...");
      break;

    case "SET_TAX_RATE":
      try {
        const rate = Number(task.payload?.rate);
        if (isNaN(rate) || rate < 0 || rate > 100) {
          alert("❌ Invalid tax rate. Must be a number between 0 and 100.");
          return;
        }

        const inTax = new ethers.Contract(IN_TAX_ADDRESS, InTaxABI.abi, signer);
        const tx = await inTax.setTaxRate(rate);
        await tx.wait();
        alert(`✅ Set tax rate to ${rate}%`);
      } catch (err) {
        console.error("SetTaxRate failed:", err);
        alert(`❌ Failed to set correct tax rate: ${err.message || "Unknown error."}`);
      }
      break;

    case "WITHDRAW_TREASURY":
      try {
        const treasury = new ethers.Contract(TREASURY_ADDRESS, TreasuryABI.abi, signer);
        const tx = await treasury.withdraw();
        await tx.wait();
        alert("✅ withdrawing your treasury funds");
      } catch (err) {
        console.error("WithdrawTreasury failed:", err);
        alert(`❌ Treasury withdrawal failed: ${err.message || "Unknown error."}`);
      }
      break;

    default:
      console.warn("⚠️ Unknown HyperBot task:", task.name);
      alert(`⚠️ Unknown task: ${task.name}`);
  }
};
