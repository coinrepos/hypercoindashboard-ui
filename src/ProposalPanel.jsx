import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import InTaxABI from "../contracts/InTax.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IN_TAX_ADDRESS = "0x06a252c76Da8aC8eE73AcbB45e5509CDD99b9a6e";

export default function ProposalPanel() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("MetaMask not found");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const instance = new ethers.Contract(IN_TAX_ADDRESS, InTaxABI.abi, signer);
    setContract(instance);
    fetchProposals(instance);
  }

  async function fetchProposals(c = contract) {
    try {
      const result = await c.getAllProposals();
      setProposals(result);
    } catch (err) {
      toast.error("Failed to fetch proposals");
    }
  }

  async function submitProposal() {
    if (!contract || !newProposal.trim()) return;
    try {
      const tx = await contract.submitProposal(newProposal);
      await tx.wait();
      toast.success("Proposal submitted");
      setNewProposal("");
      fetchProposals();
    } catch (err) {
      toast.error("Submission failed");
    }
  }

  async function vote(id, support) {
    try {
      const tx = await contract.vote(id, support);
      await tx.wait();
      toast.success(`Vote ${support ? "Yes" : "No"} recorded`);
      fetchProposals();
    } catch (err) {
      toast.error("Voting failed");
    }
  }

  async function execute(id) {
    try {
      const tx = await contract.executeProposal(id);
      await tx.wait();
      toast.success(`Proposal ${id} executed`);
      fetchProposals();
    } catch (err) {
      toast.error("Execution failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">🧠 DAO Proposal Panel</h1>
      <p className="mb-2 text-green-300">Connected Wallet: {account}</p>

      <div className="mb-6 bg-gray-800 p-4 rounded shadow">
        <textarea
          value={newProposal}
          onChange={(e) => setNewProposal(e.target.value)}
          placeholder="Enter new proposal description..."
          className="w-full p-2 rounded text-black mb-2"
        />
        <button
          onClick={submitProposal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Submit Proposal
        </button>
      </div>

      <div className="space-y-4">
        {proposals.length === 0 && (
          <p className="text-gray-400">No proposals available.</p>
        )}

        {proposals.map((p, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-blue-400">
              Proposal #{i + 1}
            </h2>
            <p className="text-sm text-gray-300">Description: {p.description}</p>
            <p className="text-sm">Yes Votes: {p.yesVotes.toString()}</p>
            <p className="text-sm">No Votes: {p.noVotes.toString()}</p>
            <p className="text-sm">
              Executed:{" "}
              {p.executed ? (
                <span className="text-green-400">Yes</span>
              ) : (
                <span className="text-yellow-400">No</span>
              )}
            </p>

            {!p.executed && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => vote(i, true)}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                >
                  ✅ Vote Yes
                </button>
                <button
                  onClick={() => vote(i, false)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  ❌ Vote No
                </button>
                <button
                  onClick={() => execute(i)}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                >
                  🏁 Execute
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
