import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TREASURY_ADDRESS = "0x83b08bd688739dcf499091B7596931c2DD8835F";

const treasuryAbi = [
  "function withdraw(address to, uint256 amount) public",
  "function deposit() public payable",
  "function getBalance() public view returns (uint256)",
  "function owner() public view returns (address)"
];

export default function TreasuryControls() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) return toast.error("Please install MetaMask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const treasury = new ethers.Contract(TREASURY_ADDRESS, treasuryAbi, signer);

      setContract(treasury);
      setAccount(accounts[0]);

      const owner = await treasury.owner();
      setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());

      const bal = await treasury.getBalance();
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      console.error(err);
      toast.error("Wallet connection failed");
    }
  }

  async function handleWithdraw() {
    if (!recipient || !amount) return toast.error("Fill all fields");
    if (!isOwner) return toast.error("Only owner can withdraw");

    try {
      const tx = await contract.withdraw(recipient, ethers.parseEther(amount));
      await tx.wait();
      toast.success("✅ Withdrawal successful");
      const bal = await contract.getBalance();
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      console.error(err);
      toast.error("❌ Withdraw failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">🏦 Treasury Controls</h2>

        <p className="text-sm mb-2">Connected: {account || "None"}</p>
        <p className="text-sm text-green-400 mb-4">Treasury Balance: {balance} ETH</p>

        <div className="mb-4">
          <label className="block text-sm mb-1">Recipient Address</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 rounded"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Amount (ETH)</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 rounded"
            placeholder="0.05"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          onClick={handleWithdraw}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
        >
          🏧 Withdraw
        </button>
      </div>
    </div>
  );
}
