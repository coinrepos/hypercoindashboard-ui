import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaWallet, FaSun, FaMoon } from "react-icons/fa";

const KREDS_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";

export default function KREDSDashboard() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [txHistory, setTxHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(accounts[0]);

        const kredsContract = new ethers.Contract(KREDS_ADDRESS, abi, signer);
        setContract(kredsContract);

        const rawBalance = await kredsContract.balanceOf(accounts[0]);
        setBalance(ethers.formatEther(rawBalance));

        try {
          const daoOwner = await kredsContract.owner();
          setIsAdmin(daoOwner.toLowerCase() === accounts[0].toLowerCase());
        } catch (err) {
          console.error("Admin check failed:", err);
          setIsAdmin(false);
        }
      } catch (err) {
        if (err.code === 4001) {
          toast.error("Connection request rejected by user.");
        } else {
          toast.error("Wallet connection failed: " + err.message);
        }
      }
    } else {
      toast.error("MetaMask not detected");
    }
  }

  async function mintTokens() {
    if (!contract) return;
    try {
      const tx = await contract.mint(account, ethers.parseEther(amount));
      await tx.wait();
      toast.success("Minted successfully");
      setTxHistory(prev => [...prev, `Minted ${amount} KREDS`]);
    } catch (error) {
      toast.error("Mint failed: " + error.message);
    }
  }

  async function burnTokens() {
    if (!contract) return;
    try {
      const tx = await contract.burn(ethers.parseEther(amount));
      await tx.wait();
      toast.success("Burned successfully");
      setTxHistory(prev => [...prev, `Burned ${amount} KREDS`]);
    } catch (error) {
      toast.error("Burn failed: " + error.message);
    }
  }

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-white text-black min-h-screen p-6"}>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar closeOnClick pauseOnHover />
      <div className="max-w-md mx-auto rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">KREDS Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-2 py-1 border rounded text-sm"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <p className="mb-2"><strong>Wallet:</strong> {account || "Not connected"}</p>
        <p className="mb-4"><strong>Balance:</strong> {balance} KREDS</p>

        {!account && (
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mb-4 flex items-center gap-2"
          >
            <FaWallet /> Connect Wallet
          </button>
        )}

        <input
          type="text"
          placeholder="Amount in KREDS"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring"
        />

        <div className="flex gap-4 justify-center">
          <button
            onClick={mintTokens}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
            title="Mint new KREDS"
          >
            Mint
          </button>

          {isAdmin && (
            <button
              onClick={burnTokens}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
              title="Burn existing KREDS (admin only)"
            >
              Burn
            </button>
          )}
        </div>

        {txHistory.length > 0 && (
          <div className="mt-6 text-left">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <ul className="list-disc list-inside space-y-1">
              {txHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
