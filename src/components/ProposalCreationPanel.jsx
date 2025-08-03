import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import daoAbi from "../contracts/HyperCoinDAO.json";

const DAO_CONTRACT_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";

export default function ProposalCreationPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [calldata, setCalldata] = useState("");
  const [account, setAccount] = useState(null);

  const createProposal = async () => {
    if (!title || !description || !targetAddress || !calldata) {
      return toast.error("All fields are required");
    }

    try {
      if (!window.ethereum) throw new Error("MetaMask not available");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(DAO_CONTRACT_ADDRESS, daoAbi.abi, signer);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const tx = await contract.submitProposal(
        title,
        description,
        targetAddress,
        calldata
      );
      await tx.wait();
      toast.success("Proposal submitted successfully");
    } catch (err) {
      toast.error("Submission failed: " + err.message);
    }
  };

  return (
    <Card className="shadow-xl bg-gray-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-green-300">📮 Create DAO Proposal</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Proposal Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="text-black" />

          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="text-black" />

          <Label htmlFor="targetAddress">Target Contract Address</Label>
          <Input id="targetAddress" value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)} className="text-black" />

          <Label htmlFor="calldata">Encoded Calldata</Label>
          <Textarea id="calldata" value={calldata} onChange={(e) => setCalldata(e.target.value)} className="text-black" />
        </div>

        <Button onClick={createProposal} className="bg-blue-600 hover:bg-blue-700 mt-4">
          🚀 Submit Proposal
        </Button>
      </CardContent>
      <ToastContainer position="bottom-right" autoClose={4000} />
    </Card>
  );
}