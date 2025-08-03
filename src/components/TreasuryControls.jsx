import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TREASURY_ADDRESS = "0x83b08bd688739dcf499091B7596931c2DD8835F";
const KREDS_TOKEN_ADDRESS = "0xe91aB7B3B810B7c40C0197DF87CcC6d2d02F73f8";

export default function TreasuryControls() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("🦊 MetaMask required");
      return;
    }
    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const tokenContract = new ethers.Contract(
        KREDS_TOKEN_ADDRESS,
        ["function balanceOf(address) view returns (uint256)"],
        provider
      );
      const bal = await tokenContract.balanceOf(TREASURY_ADDRESS);
      setAccount(accounts[0]);
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit() {
    if (!amount || isNaN(amount)) {
      toast.error("❌ Enter a valid KREDS amount");
      return;
    }
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        KREDS_TOKEN_ADDRESS,
        ["function transfer(address,uint256) returns (bool)"],
        signer
      );
      const tx = await tokenContract.transfer(TREASURY_ADDRESS, ethers.parseEther(amount));
      await tx.wait();
      toast.success("✅ KREDS deposited");
      connectWallet(); // Refresh balance
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto border border-gray-700">
      <ToastContainer position="bottom-right" />
      <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500 pb-2">
        🏦 KREDS Treasury
      </h2>
      
      <p className="text-sm text-gray-400 mb-2">
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
      </p>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p className="text-lg font-mono">
          Balance: <span className="text-green-400">{balance}</span> KREDS
        </p>
      </div>

      <input
        type="text"
        placeholder="Amount (KREDS)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none text-white"
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isLoading ? "⏳ Connecting..." : "🔗 Connect Wallet"}
        </button>
        
        <button
          onClick={handleDeposit}
          disabled={isLoading || !account}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "⏳ Processing..." : "💰 Deposit"}
        </button>
      </div>
    </div>
  );
}