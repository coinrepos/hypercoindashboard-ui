import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import daoAbi from "./contracts/HyperCoinDAO.json";
import inTaxAbi from "./contracts/InTax.json";
import treasuryAbi from "./contracts/TreasuryControls.json";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaGavel, FaBalanceScaleLeft, FaSun, FaMoon } from "react-icons/fa";

const DAO_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";
const INTAX_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with real address
const TREASURY_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with real address

export default function KREDSDAO() {
  const [account, setAccount] = useState(null);
  const [daoContract, setDaoContract] = useState(null);
  const [inTaxContract, setInTaxContract] = useState(null);
  const [treasuryContract, setTreasuryContract] = useState(null);
  const [proposal, setProposal] = useState("");
  const [proposalList, setProposalList] = useState([]);
  const [treasuryStatus, setTreasuryStatus] = useState("Unknown");
  const [intaxRate, setIntaxRate] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [txHistory, setTxHistory] = useState([]);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const dao = new ethers.Contract(DAO_ADDRESS, daoAbi.abi, signer);
      const inTax = new ethers.Contract(INTAX_ADDRESS, inTaxAbi.abi, signer);
      const treasury = new ethers.Contract(TREASURY_ADDRESS, treasuryAbi.abi, signer);

      setAccount(accounts[0]);
      setDaoContract(dao);
      setInTaxContract(inTax);
      setTreasuryContract(treasury);

      const owner = await dao.owner();
      setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
    } catch (err) {
      toast.error("Wallet connection failed: " + err.message);
    }
  }

  async function deployProposal() {
    if (!daoContract || !isOwner) return;
    try {
      const tx = await daoContract.deployProposal();
      await tx.wait();
      toast.success("Proposal deployed!");
      setTxHistory(prev => [...prev, `Proposal deployed at ${new Date().toLocaleTimeString()}`]);
      fetchProposal();
    } catch (err) {
      toast.error("Deployment failed: " + err.message);
    }
  }

  async function fetchProposal() {
    if (!daoContract) return;
    try {
      const proposalText = await daoContract.deployProposal();
      setProposal(proposalText);
    } catch (err) {
      toast.error("Fetching proposal failed: " + err.message);
    }
  }

  async function checkTreasury() {
    if (!daoContract) return;
    try {
      const result = await daoContract.treasuryStatus();
      setTreasuryStatus(result);
      toast.info("Treasury says: " + result);
    } catch (err) {
      toast.error("Error checking treasury status");
    }
  }

  async function checkInTaxRate() {
    if (!inTaxContract) return;
    try {
      const rate = await inTaxContract.getInTaxRate();
      setIntaxRate(rate.toString());
      toast.info("InTax rate: " + rate);
    } catch (err) {
      toast.error("Error fetching InTax rate");
    }
  }

  async function fetchProposalList() {
    setProposalList([
      { id: 1, title: "Proposal Alpha", votes: 12 },
      { id: 2, title: "Proposal Beta", votes: 8 }
    ]);
  }

  useEffect(() => {
    fetchProposalList();
  }, [daoContract]);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-white text-black min-h-screen p-6"}>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar closeOnClick pauseOnHover />
      <div className="max-w-xl mx-auto rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            <FaBalanceScaleLeft /> KREDS DAO Governance
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-2 py-1 border rounded text-sm"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <p className="mb-2 font-mono"><strong>Wallet:</strong> {account || "Not connected"}</p>

        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          {account ? "Connected" : "Connect Wallet"}
        </button>

        {isOwner && (
          <button
            onClick={deployProposal}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4 ml-2"
          >
            <FaGavel className="inline-block mr-2" /> Deploy Proposal
          </button>
        )}

        <button
          onClick={checkTreasury}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded mb-2"
        >
          Check Treasury Status
        </button>

        <button
          onClick={checkInTaxRate}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded mb-4 ml-2"
        >
          Check InTax Rate
        </button>

        <p className="mb-2"><strong>Treasury:</strong> {treasuryStatus}</p>
        <p className="mb-4"><strong>InTax Rate:</strong> {intaxRate !== null ? intaxRate : "Not fetched"}</p>

        <div className="mt-4">
          <button
            onClick={fetchProposal}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Fetch Proposal Output
          </button>
          {proposal && <p className="mt-3 bg-gray-200 p-3 rounded text-black animate-pulse">{proposal}</p>}
        </div>

        {proposalList.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Proposal List</h2>
            <ul className="bg-gray-100 p-3 rounded text-sm text-gray-800 space-y-2">
              {proposalList.map((item) => (
                <li key={item.id} className="border-b border-gray-300 pb-1">
                  {item.title} — <span className="text-blue-700 font-bold">{item.votes} votes</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {txHistory.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <ul className="bg-gray-100 p-3 rounded text-sm text-gray-800">
              {txHistory.map((entry, idx) => (
                <li key={idx} className="border-b border-gray-300 py-1 last:border-0">{entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
