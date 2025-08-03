import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import daoAbi from "../contracts/HyperCoinDAO.json";

const DAO_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";

export default function ProposalVoting() {
  const [account, setAccount] = useState(null);
  const [dao, setDao] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const contract = new ethers.Contract(DAO_ADDRESS, daoAbi.abi, signer);
      setDao(contract);
      fetchProposals(contract);
    } catch (err) {
      toast.error("Wallet connection failed");
    }
  }

  async function fetchProposals(contract) {
    try {
      const events = await contract.queryFilter("ProposalCreated");
      const uniqueProposals = events.map((e, i) => ({
        id: i,
        proposer: e.args[0],
        action: e.args[1],
        timestamp: new Date(Number(e.blockTimestamp) * 1000).toLocaleString(),
        yes: Math.floor(Math.random() * 100), // placeholder
        no: Math.floor(Math.random() * 100),
      }));
      setProposals(uniqueProposals);
    } catch (err) {
      toast.error("Failed to fetch proposals");
    }
  }

  function handleVote(id, voteType) {
    const updated = { ...votes };
    updated[id] = voteType;
    setVotes(updated);
    toast.success(`Vote ${voteType === "yes" ? "YES" : "NO"} submitted for proposal ${id}`);
  }

  return (
    <Card className="bg-gray-900 text-white shadow-lg p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🗳️ KREDS DAO Voting Panel</h2>
        <p className="mb-4">Connected Wallet: {account || "Not connected"}</p>

        {proposals.length === 0 ? (
          <p>No proposals found.</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal.id} className="mb-6 border-b pb-4">
              <h3 className="text-md font-semibold text-green-400">
                Proposal #{proposal.id + 1}: {proposal.action}
              </h3>
              <p className="text-sm text-gray-300">By {proposal.proposer}</p>
              <p className="text-sm text-gray-400">At {proposal.timestamp}</p>

              <div className="flex space-x-4 mt-2">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleVote(proposal.id, "yes")}
                >
                  ✅ Vote Yes
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleVote(proposal.id, "no")}
                >
                  ❌ Vote No
                </Button>
              </div>

              <PieChart width={300} height={200} className="mt-4">
                <Pie
                  dataKey="value"
                  data={[
                    { name: "Yes", value: proposal.yes },
                    { name: "No", value: proposal.no },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  label
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          ))
        )}

        <ToastContainer position="bottom-right" autoClose={3000} />
      </CardContent>
    </Card>
  );
}
