import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import inTaxAbi from "../contracts/InTax.json";
import daoAbi from "../contracts/HyperCoinDAO.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INTAX_ADDRESS = "0x06a252c76Da8aC8eE73AcbB45e5509CDD99b9a6e";
const DAO_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";

export default function InTaxDashboard() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [rate, setRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) return toast.error("MetaMask missing");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const intax = new ethers.Contract(INTAX_ADDRESS, inTaxAbi.abi, signer);
      const owner = await intax.owner();
      setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());

      const currentRate = await intax.getTaxRate();
      setRate(currentRate.toString());

      setContract(intax);
    } catch (err) {
      toast.error("Connection failed");
    }
  }

  async function updateRate() {
    if (!contract || !isOwner) return;
    try {
      const tx = await contract.setTaxRate(newRate);
      await tx.wait();
      toast.success("Rate updated");
      const updated = await contract.getTaxRate();
      setRate(updated.toString());
    } catch (err) {
      toast.error("Failed to update tax rate");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">InTax Admin</h1>
        <p className="mb-2">Wallet: {account || "Not connected"}</p>
        <p className="mb-2">Current Tax Rate: {rate} bps</p>

        {isOwner && (
          <>
            <input
              className="w-full p-2 bg-gray-700 rounded mb-2"
              placeholder="New Tax Rate (bps)"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
            />
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded w-full"
              onClick={updateRate}
            >
              Update Tax Rate
            </button>
          </>
        )}
      </div>
    </div>
  );
}
