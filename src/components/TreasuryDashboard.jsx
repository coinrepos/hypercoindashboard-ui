import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import treasuryAbi from "./contracts/TreasuryControls.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TREASURY_ADDRESS = "0x83b08bd688739dcf499091B7596931c2DD8835F";

export default function TreasuryDashboard() {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("Loading...");
  const [authorized, setAuthorized] = useState("");
  const [authorizeAddress, setAuthorizeAddress] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) return toast.error("MetaMask not found");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setSigner(_signer);
      const treasury = new ethers.Contract(TREASURY_ADDRESS, treasuryAbi.abi, _signer);
      setContract(treasury);
    } catch (err) {
      toast.error("Wallet connection failed: " + err.message);
    }
  }

  async function getBalance() {
    try {
      const result = await contract.getBalance();
      setBalance(ethers.formatEther(result) + " ETH");
    } catch (err) {
      toast.error("Unable to fetch balance");
    }
  }

  async function withdraw() {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      toast.success("Withdraw successful");
      getBalance();
    } catch (err) {
      toast.error("Withdraw failed: " + err.message);
    }
  }

  async function authorizeCaller() {
    try {
      const tx = await contract.authorizeCaller(authorizeAddress);
      await tx.wait();
      toast.success("Caller authorized");
    } catch (err) {
      toast.error("Authorization failed: " + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Treasury Dashboard</h1>
        <p className="mb-2 text-sm">Wallet: {account || "Not connected"}</p>

        <button
          onClick={getBalance}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        >
          Get Treasury Balance
        </button>
        <p className="mb-4 text-sm font-mono">Balance: {balance}</p>

        <button
          onClick={withdraw}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
        >
          Withdraw
        </button>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Address to authorize"
            value={authorizeAddress}
            onChange={(e) => setAuthorizeAddress(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 mb-2"
          />
          <button
            onClick={authorizeCaller}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
          >
            Authorize Caller
          </button>
        </div>
      </div>
    </div>
  );
}
