import React from "react";
import { ethers } from "ethers";
import ShadowTokenABI from "../contracts/ShadowToken.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SHADOW_TOKEN_ADDRESS = "0xF3e87934D66bF742d4623e368B03D828162aB020";

export default function ShadowTokenControl() {
  async function triggerSelfDestruct() {
    if (!window.ethereum) return toast.error("🦊 Install MetaMask");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = new ethers.Contract(SHADOW_TOKEN_ADDRESS, ShadowTokenABI.abi, signer);
      const tx = await token.destroy();
      await tx.wait();
      toast.success("💥 Shadow Token destroyed");
    } catch (err) {
      toast.error("Failed to destroy token");
    }
  }

  return (
    <div className="bg-red-900 text-white p-6 rounded shadow max-w-md mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-xl font-bold">🧨 Shadow Token Protocol</h2>
      <p className="text-sm mb-4">This will trigger a permanent recall of the test KREDS token.</p>
      <button
        onClick={triggerSelfDestruct}
        className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded"
      >
        🔥 Destroy Shadow Token
      </button>
    </div>
  );
}
