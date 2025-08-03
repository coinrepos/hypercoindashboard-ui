import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import InTaxABI from "../contracts/InTax.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IN_TAX_ADDRESS = "0x06a252c76Da8aC8eE73AcbB45e5509CDD99b9a6e";

export default function InTax() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [rate, setRate] = useState("");
  const [currentRate, setCurrentRate] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) return toast.error("🦊 MetaMask required");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      const inTax = new ethers.Contract(IN_TAX_ADDRESS, InTaxABI.abi, signer);
      
      setAccount(accounts[0]);
      setContract(inTax);
      
      const existingRate = await inTax.getTaxRate();
      setCurrentRate(existingRate.toString());
    } catch (err) {
      console.error(err);
      toast.error("❌ Wallet connection failed");
    }
  }

  async function updateTaxRate() {
    if (!rate || isNaN(rate)) return toast.error("Invalid rate");
    try {
      const tx = await contract.setTaxRate(rate);
      await tx.wait();
      toast.success(`✅ Tax rate updated to ${rate}%`);
      setCurrentRate(rate);
    } catch (err) {
      toast.error("❌ Failed to update rate");
    }
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded shadow-lg max-w-md mx-auto">
      <ToastContainer />
      <h2 className="text-xl font-bold text-green-400 mb-4">💸 KREDS InTax Settings</h2>
      <p>Wallet: {account || "Not connected"}</p>
      <p>Current Tax Rate: {currentRate}%</p>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Set new tax rate (0–100)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="text-black w-full rounded p-2"
        />
      </div>

      <button
        onClick={updateTaxRate}
        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        🔄 Update Tax Rate
      </button>
    </div>
  );
}