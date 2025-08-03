import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import daoAbi from "../contracts/HyperCoinDAO.json";

const DAO_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";

export default function ProposalList() {
  const [proposals, setProposals] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const user = await signer.getAddress();
    setAccount(user);

    const dao = new ethers.Contract(DAO_ADDRESS, daoAbi.abi, signer);
    setContract(dao);

    try {
      const count = await dao.proposalCount(); // assumes DAO has `proposalCount`
      const items = [];
      for (let i = 0; i < count; i++) {
        const proposal = await dao.proposals(i);
        items.push({ id: i, ...proposal });
      }
      setProposals(items);
    } catch (err) {
      console.error("Proposal fetch error:", err);
    }
  }

  async function vote(id, support) {
    try {
      const tx = await contract.vote(id, support);
      await tx.wait();
      alert("Vote submitted!");
      init(); // refresh
    } catch (err) {
      console.error("Voting error", err);
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📋 Live DAO Proposals</h2>
      {proposals.map((p) => (
        <div key={p.id} className="bg-white rounded p-4 mb-4 shadow">
          <p className="font-bold">#{p.id} — {p.title}</p>
          <p>Description: {p.description}</p>
          <p>Status: {p.executed ? "✅ Executed" : "⏳ Pending"}</p>
          <div className="flex gap-4 mt-2">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => vote(p.id, true)}
            >
              👍 Vote For
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => vote(p.id, false)}
            >
              👎 Vote Against
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
