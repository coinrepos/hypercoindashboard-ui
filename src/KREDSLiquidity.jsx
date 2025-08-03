import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import KREDS_ABI from "../contracts/KREDS.json";
import RBTC_ABI from "../contracts/RBTC.json"; // Ensure this ABI is correct

const KREDS_ADDRESS = "0xF3e87934D66bF742d4623e368B03D828162aB020";
const RBTC_ADDRESS = "0xD291bC6F22a7dF40839AeA370c561C46c8589b7C";

// You can change this to your liquidity pool router or other destination address
const APPROVAL_TARGET_ADDRESS = KREDS_ADDRESS;

export default function KREDSLiquidity() {
  const [account, setAccount] = useState("");
  const [kreAllowance, setKreAllowance] = useState(0);
  const [rbtcAllowance, setRbtcAllowance] = useState(0);

  useEffect(() => {
    checkApprovals();
  }, []);

  async function checkApprovals() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const user = await signer.getAddress();
      setAccount(user);

      const kreds = new ethers.Contract(KREDS_ADDRESS, KREDS_ABI.abi, signer);
      const rbtc = new ethers.Contract(RBTC_ADDRESS, RBTC_ABI.abi, signer);

      const kre = await kreds.allowance(user, APPROVAL_TARGET_ADDRESS);
      const rb = await rbtc.allowance(user, APPROVAL_TARGET_ADDRESS);

      setKreAllowance(Number(ethers.formatEther(kre)));
      setRbtcAllowance(Number(ethers.formatEther(rb)));
    } catch (err) {
      toast.error("Failed to check token allowances");
    }
  }

  async function approveToken(tokenAddress, abi) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = new ethers.Contract(tokenAddress, abi, signer);
      const tx = await token.approve(APPROVAL_TARGET_ADDRESS, ethers.parseEther("1000000"));
      await tx.wait();
      toast.success("Token approved!");
      checkApprovals();
    } catch (err) {
      toast.error("Approval failed: " + err.message);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded shadow max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">KREDS Liquidity Controls</h2>
      <p className="mb-4"><strong>Wallet:</strong> {account || "Not connected"}</p>

      <div className="mb-6">
        <p>KREDS Allowance: {kreAllowance}</p>
        {kreAllowance < 1 && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
            onClick={() => approveToken(KREDS_ADDRESS, KREDS_ABI.abi)}
          >
            Approve KREDS
          </button>
        )}
      </div>

      <div>
        <p>RBTC Allowance: {rbtcAllowance}</p>
        {rbtcAllowance < 1 && (
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2"
            onClick={() => approveToken(RBTC_ADDRESS, RBTC_ABI.abi)}
          >
            Approve RBTC
          </button>
        )}
      </div>
    </div>
  );
}
