import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import EscrowManager from "./EscrowManager";
import ProposalCreationPanel from "./ProposalCreationPanel";
import ProposalVoting from "./DAOVoting";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import daoAbi from "../contracts/HyperCoinDAO.json";
import intaxAbi from "../contracts/InTax.json";
import treasuryAbi from "../contracts/TreasuryControls.json";

const DAO_CONTRACT_ADDRESS = "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8";
const INTAX_CONTRACT_ADDRESS = "0x06a252c76Da8aC8eE73AcbB45e5509CDD99b9a6e";
const TREASURY_CONTRACT_ADDRESS = "0x83b08bd688739dcf499091B7596931c2DD8835F";
const KREDS_TOKEN_ADDRESS = "0xe91aB7B3B810B7c40C0197DF87CcC6d2d02F73f8";

export default function DAOTemplatePanel() {
  const [account, setAccount] = useState(null);
  const [daoContract, setDaoContract] = useState(null);
  const [intaxContract, setIntaxContract] = useState(null);
  const [treasuryContract, setTreasuryContract] = useState(null);
  const [treasuryBalance, setTreasuryBalance] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [userRole, setUserRole] = useState("Guest");
  const [proposalLog, setProposalLog] = useState([]);
  const [taxRate, setTaxRate] = useState("");
  const [newTaxRate, setNewTaxRate] = useState("");
  const [votingEnabled, setVotingEnabled] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not found");
      return;
    }
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      setProvider(_provider);
      setSigner(_signer);
      setAccount(accounts[0]);

      const dao = new ethers.Contract(DAO_CONTRACT_ADDRESS, daoAbi.abi, _signer);
      setDaoContract(dao);

      const intax = new ethers.Contract(INTAX_CONTRACT_ADDRESS, intaxAbi.abi, _signer);
      setIntaxContract(intax);

      const treasury = new ethers.Contract(TREASURY_CONTRACT_ADDRESS, treasuryAbi.abi, _signer);
      setTreasuryContract(treasury);

      const owner = await dao.owner();
      setUserRole(owner.toLowerCase() === accounts[0].toLowerCase() ? "Owner" : "Member");

      const votingState = await dao.votingEnabled();
      setVotingEnabled(votingState);

      updateTreasuryBalance(treasury);
      fetchProposalLog(dao);
      fetchCurrentTaxRate(intax);
    } catch (err) {
      toast.error(`Wallet connection failed: ${err.message}`);
    }
  };

  const updateTreasuryBalance = async (contract) => {
    try {
      const tokenContract = new ethers.Contract(
        KREDS_TOKEN_ADDRESS,
        ["function balanceOf(address) view returns (uint256)"],
        provider
      );
      const balance = await tokenContract.balanceOf(TREASURY_CONTRACT_ADDRESS);
      setTreasuryBalance(ethers.formatEther(balance));
    } catch (err) {
      toast.error(`Failed to fetch KREDS balance: ${err.message}`);
    }
  };

  const fetchCurrentTaxRate = async (contract) => {
    try {
      const rate = await contract.getTaxRate();
      setTaxRate((Number(rate) / 10).toFixed(1));
    } catch (err) {
      toast.error(`Failed to fetch tax rate: ${err.message}`);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !treasuryContract) return;
    try {
      const tokenContract = new ethers.Contract(
        KREDS_TOKEN_ADDRESS,
        ["function transfer(address,uint256) returns (bool)"],
        signer
      );
      const tx = await tokenContract.transfer(account, ethers.parseEther(withdrawAmount));
      await tx.wait();
      toast.success("KREDS withdrawn");
      updateTreasuryBalance(treasuryContract);
    } catch (err) {
      toast.error(`Withdrawal failed: ${err.message}`);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || !treasuryContract) return;
    try {
      const tokenContract = new ethers.Contract(
        KREDS_TOKEN_ADDRESS,
        ["function transfer(address,uint256) returns (bool)"],
        signer
      );
      const tx = await tokenContract.transfer(TREASURY_CONTRACT_ADDRESS, ethers.parseEther(depositAmount));
      await tx.wait();
      toast.success("KREDS deposited");
      updateTreasuryBalance(treasuryContract);
    } catch (err) {
      toast.error(`Deposit failed: ${err.message}`);
    }
  };

  const handleSetTaxRate = async () => {
    if (!intaxContract || !newTaxRate) return;
    try {
      const rawRate = ethers.toBigInt(Math.floor(parseFloat(newTaxRate) * 10));
      const tx = await intaxContract.setTaxRate(rawRate);
      await tx.wait();
      toast.success("Tax rate updated");
      fetchCurrentTaxRate(intaxContract);
    } catch (err) {
      toast.error(`Failed to set tax rate: ${err.message}`);
    }
  };

  const toggleVoting = async () => {
    if (!daoContract) return;
    try {
      const tx = await daoContract.setVotingEnabled(!votingEnabled);
      await tx.wait();
      toast.success(`Voting ${!votingEnabled ? "enabled" : "disabled"}`);
      setVotingEnabled(!votingEnabled);
    } catch (err) {
      toast.error(`Failed to toggle voting: ${err.message}`);
    }
  };

  const fetchProposalLog = async (contract) => {
    try {
      const logs = await contract.queryFilter("ProposalCreated");
      const entries = logs.map((log) => ({
        voter: log.args[0],
        action: log.args[1],
        timestamp: new Date(Number(log.blockTimestamp) * 1000).toLocaleString(),
      }));
      setProposalLog(entries);
    } catch (err) {
      console.warn("No ProposalCreated events found.");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <Tabs defaultValue="treasury" className="text-white">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
          <TabsTrigger value="voting">Proposal Voting</TabsTrigger>
          {userRole === "Owner" && <TabsTrigger value="create">Create Proposal</TabsTrigger>}
          <TabsTrigger value="escrow">Escrow</TabsTrigger>
        </TabsList>

        <TabsContent value="treasury">
          <Card className="shadow-lg bg-gray-800">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-bold text-green-300">🏦 Treasury Management</h2>
              <p><strong>Current Balance:</strong> {treasuryBalance} KREDS</p>

              {userRole === "Owner" ? (
                <div className="space-y-2">
                  <Label htmlFor="withdraw">Withdraw (KREDS)</Label>
                  <Input id="withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                  <Button onClick={handleWithdraw} className="bg-red-600 hover:bg-red-700">💸 Withdraw</Button>

                  <Label htmlFor="deposit">Deposit (KREDS)</Label>
                  <Input id="deposit" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                  <Button onClick={handleDeposit} className="bg-blue-600 hover:bg-blue-700">🏦 Deposit</Button>

                  <div className="mt-4">
                    <Label htmlFor="newRate">Update InTax Rate (%)</Label>
                    <Input id="newRate" value={newTaxRate} onChange={(e) => setNewTaxRate(e.target.value)} />
                    <Button onClick={handleSetTaxRate} className="bg-yellow-600 hover:bg-yellow-700 mt-2">🔧 Set Tax Rate</Button>
                  </div>

                  <div className="mt-4">
                    <Button onClick={toggleVoting} className="bg-purple-600 hover:bg-purple-700">
                      {votingEnabled ? "🛑 Disable Voting" : "✅ Enable Voting"}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-yellow-300">You must be the DAO Owner to use treasury functions.</p>
              )}

              <div className="mt-6">
                <h3 className="text-md font-semibold">📊 InTax Module</h3>
                <p><strong>Current Royalty Rate:</strong> {taxRate}%</p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-semibold">📜 Proposal Log</h3>
                <ul className="list-disc ml-6">
                  {proposalLog.map((entry, i) => (
                    <li key={i} className="text-sm text-gray-300">
                      {entry.voter} proposed: {entry.action} — {entry.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voting">
          {votingEnabled ? (
            <ProposalVoting account={account} />
          ) : (
            <p className="text-yellow-400">Voting is currently disabled. Enable it in Treasury tab.</p>
          )}
        </TabsContent>

        {userRole === "Owner" && (
          <TabsContent value="create">
            <ProposalCreationPanel />
          </TabsContent>
        )}

        <TabsContent value="escrow">
          <EscrowManager />
        </TabsContent>
      </Tabs>
    </>
  );
}