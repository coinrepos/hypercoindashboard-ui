import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import escrowAbi from "../contracts/EscrowManager.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ESCROW_CONTRACT_ADDRESS = "0xFCdF836A39C0f873F53A7bc2b7e911cd618c99c5";
const KREDS_TOKEN_ADDRESS = "0xe91aB7B3B810B7c40C0197DF87CcC6d2d02F73f8";

export default function EscrowDashboard() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [escrowContract, setEscrowContract] = useState(null);
  const [kredsToken, setKredsToken] = useState(null);
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [escrows, setEscrows] = useState([]);
  const [escrowIdToRelease, setEscrowIdToRelease] = useState("");
  const [isLoading, setIsLoading] = useState({
    init: false,
    create: false,
    release: false
  });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (!window.ethereum) return toast.error("MetaMask not found");
    try {
      setIsLoading(prev => ({...prev, init: true}));
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _account = await _signer.getAddress();
      const contract = new ethers.Contract(ESCROW_CONTRACT_ADDRESS, escrowAbi.abi, _signer);
      const token = new ethers.Contract(
        KREDS_TOKEN_ADDRESS, 
        [
          "function transfer(address,uint256)",
          "function approve(address,uint256)"
        ], 
        _signer
      );
      
      setProvider(_provider);
      setSigner(_signer);
      setEscrowContract(contract);
      setKredsToken(token);
      setAccount(_account);
      await fetchEscrows(contract);
    } catch (err) {
      toast.error(`❌ Initialization failed: ${err.message}`);
    } finally {
      setIsLoading(prev => ({...prev, init: false}));
    }
  }

  async function fetchEscrows(contract) {
    try {
      const count = await contract.escrowCount();
      const list = [];
      for (let i = 0; i < count; i++) {
        const escrow = await contract.escrows(i);
        list.push({ id: i, ...escrow });
      }
      setEscrows(list);
    } catch (err) {
      toast.error("❌ Failed to fetch escrows");
    }
  }

  async function createEscrow() {
    if (!recipient || !amount) return toast.error("❌ Fields required");
    try {
      setIsLoading(prev => ({...prev, create: true}));
      const approveTx = await kredsToken.approve(ESCROW_CONTRACT_ADDRESS, ethers.parseEther(amount));
      await approveTx.wait();

      const tx = await escrowContract.createEscrow(recipient, ethers.parseEther(amount));
      await tx.wait();
      toast.success("✅ KREDS Escrow created");
      setRecipient("");
      setAmount("");
      await fetchEscrows(escrowContract);
    } catch (err) {
      toast.error(`❌ Creation failed: ${err.message}`);
    } finally {
      setIsLoading(prev => ({...prev, create: false}));
    }
  }

  async function releaseEscrow() {
    if (!escrowIdToRelease) return toast.error("❌ Enter escrow ID");
    try {
      setIsLoading(prev => ({...prev, release: true}));
      const tx = await escrowContract.releaseEscrow(escrowIdToRelease);
      await tx.wait();
      toast.success("✅ KREDS Escrow released");
      setEscrowIdToRelease("");
      await fetchEscrows(escrowContract);
    } catch (err) {
      toast.error(`❌ Release failed: ${err.message}`);
    } finally {
      setIsLoading(prev => ({...prev, release: false}));
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ToastContainer position="bottom-right" />
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-500 pb-2">
          🔒 KREDS Escrow Dashboard
        </h1>
        <p className="text-sm text-gray-400 mb-4">
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
        </p>

        {/* Create Escrow Section */}
        <div className="space-y-4 mb-8 p-4 bg-gray-750 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold text-green-300">Create New Escrow</h2>
          <input
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
            placeholder="Recipient address (0x...)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
            placeholder="Amount (KREDS)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <button
            onClick={createEscrow}
            disabled={isLoading.create}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
              isLoading.create
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading.create ? "⏳ Creating..." : "✨ Create KREDS Escrow"}
          </button>
        </div>

        {/* Live Escrows Section */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-green-300 border-b border-green-500 pb-2">
            Active Escrows
          </h2>
          {escrows.length === 0 ? (
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-700 text-center">
              <p className="text-gray-400">No active escrows found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {escrows.map((e) => (
                <div key={e.id} className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <p className="text-gray-400">ID:</p>
                    <p className="font-mono">#{e.id}</p>
                    <p className="text-gray-400">Amount:</p>
                    <p className="font-mono text-green-400">{ethers.formatEther(e.amount)} KREDS</p>
                    <p className="text-gray-400">Status:</p>
                    <p className={
                      e.status === 0 ? "text-yellow-400" : 
                      e.status === 1 ? "text-green-400" : "text-red-400"
                    }>
                      {["⏳ Pending", "✅ Released", "❌ Cancelled"][e.status]}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400 break-all">From: {e.depositor}</p>
                    <p className="text-gray-400 break-all">To: {e.recipient}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Release Escrow Section */}
        <div className="space-y-4 p-4 bg-gray-750 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold text-green-300">Release Escrow</h2>
          <input
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
            placeholder="Escrow ID to release"
            value={escrowIdToRelease}
            onChange={(e) => setEscrowIdToRelease(e.target.value)}
            type="number"
          />
          <button
            onClick={releaseEscrow}
            disabled={isLoading.release}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
              isLoading.release
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading.release ? "⏳ Releasing..." : "🚀 Release KREDS"}
          </button>
        </div>
      </div>
    </div>
  );
}