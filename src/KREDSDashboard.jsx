import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import tokenAbi from "./contracts/KREDS.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMoon, FaSun, FaExchangeAlt, FaFire, FaCoins, FaVoteYea, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const TOKEN_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F";
const ADMIN_ADDRESSES = [
  "0xb83b08bd688739dcf499091B7596931c2DD8835F".toLowerCase(),
  "0xE91Ab7b3b810B7C40c0197Df87cCc6d2D02F73f8".toLowerCase(),
];

export default function KREDSDashboard() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [mintAmount, setMintAmount] = useState("");
  const [dark, setDark] = useState(false);
  const [contract, setContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [txHistory, setTxHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("MetaMask not found");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(TOKEN_ADDRESS, tokenAbi.abi, signer);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const user = accounts[0];
      setAccount(user);
      setContract(contractInstance);
      setIsAdmin(ADMIN_ADDRESSES.includes(user.toLowerCase()));

      const userBalance = await contractInstance.balanceOf(user);
      setBalance(ethers.formatUnits(userBalance, 18));
      
      // Fetch transaction history (mock - replace with actual implementation)
      const mockTxHistory = [
        { type: "mint", amount: "100", date: new Date(), status: "completed" },
        { type: "transfer", amount: "50", date: new Date(), status: "completed" }
      ];
      setTxHistory(mockTxHistory);
    } catch (err) {
      toast.error("Wallet connection failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function mint() {
    if (!mintAmount) return toast.error("Enter an amount to mint");

    try {
      setLoading(true);
      const amountParsed = ethers.parseUnits(mintAmount, 18);
      const tx = await contract.mint(account, amountParsed);
      await tx.wait();
      toast.success("Mint successful!");
      
      const updatedBalance = await contract.balanceOf(account);
      setBalance(ethers.formatUnits(updatedBalance, 18));
      
      // Update transaction history
      setTxHistory(prev => [
        { type: "mint", amount: mintAmount, date: new Date(), status: "completed" },
        ...prev
      ]);
    } catch (err) {
      toast.error("Mint failed: " + err.message);
    } finally {
      setLoading(false);
      setMintAmount("");
    }
  }

  async function burn() {
    if (!mintAmount) return toast.error("Enter an amount to burn");

    try {
      setLoading(true);
      const amountParsed = ethers.parseUnits(mintAmount, 18);
      const tx = await contract.burn(amountParsed);
      await tx.wait();
      toast.success("Burn successful!");
      
      const updatedBalance = await contract.balanceOf(account);
      setBalance(ethers.formatUnits(updatedBalance, 18));
      
      // Update transaction history
      setTxHistory(prev => [
        { type: "burn", amount: mintAmount, date: new Date(), status: "completed" },
        ...prev
      ]);
    } catch (err) {
      toast.error("Burn failed: " + err.message);
    } finally {
      setLoading(false);
      setMintAmount("");
    }
  }

  return (
    <div className={`min-h-screen p-6 ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <ToastContainer position="bottom-right" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">KREDS Dashboard</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDark(!dark)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {dark ? <FaSun className="text-yellow-300" /> : <FaMoon />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 justify-center py-4"
            variant={dark ? "secondary" : "outline"}
          >
            <FaHome /> Dashboard
          </Button>
          <Button 
            onClick={() => navigate("/swap")}
            className="flex items-center gap-2 justify-center py-4"
            variant={dark ? "secondary" : "outline"}
          >
            <FaExchangeAlt /> TEx
          </Button>
          <Button 
            onClick={() => navigate("/burn")}
            className="flex items-center gap-2 justify-center py-4"
            variant={dark ? "secondary" : "outline"}
          >
            <FaFire /> Burn
          </Button>
          <Button 
            onClick={() => navigate("/dao")}
            className="flex items-center gap-2 justify-center py-4"
            variant={dark ? "secondary" : "outline"}
          >
            <FaVoteYea /> DAO
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`${dark ? "bg-gray-800" : "bg-white"}`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Wallet Info</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {account ? (
                    <span className="text-green-500">Connected</span>
                  ) : (
                    <span className="text-red-500">Disconnected</span>
                  )}
                </p>
                {account && (
                  <>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      <span className="text-sm break-all">{account}</span>
                    </p>
                    <p>
                      <span className="font-medium">Balance:</span>{" "}
                      <span className="text-xl font-bold">{balance} KREDS</span>
                    </p>
                    <p>
                      <span className="font-medium">Role:</span>{" "}
                      {isAdmin ? (
                        <span className="text-red-500">Admin</span>
                      ) : (
                        <span className="text-blue-500">User</span>
                      )}
                    </p>
                  </>
                )}
                {!account && (
                  <Button onClick={connectWallet} className="w-full mt-4">
                    Connect Wallet
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className={`${dark ? "bg-gray-800" : "bg-white"} col-span-1 lg:col-span-2`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Token Actions</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Amount</label>
                  <Input
                    type="text"
                    placeholder="Enter KREDS amount"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    className={`w-full ${dark ? "bg-gray-700" : ""}`}
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={mint}
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    disabled={!account || loading}
                  >
                    {loading ? "Processing..." : "Mint"}
                  </Button>
                  {isAdmin && (
                    <Button
                      onClick={burn}
                      className="bg-red-600 hover:bg-red-700 flex-1"
                      disabled={!account || loading}
                    >
                      {loading ? "Processing..." : "Burn"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {account && (
          <Card className={`mt-6 ${dark ? "bg-gray-800" : "bg-white"}`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              {txHistory.length === 0 ? (
                <p className="text-gray-500">No transactions yet</p>
              ) : (
                <div className="space-y-3">
                  {txHistory.map((tx, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex justify-between">
                        <span className="capitalize font-medium">{tx.type}</span>
                        <span className="font-bold">{tx.amount} KREDS</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>{tx.date.toLocaleString()}</span>
                        <span className={`${
                          tx.status === "completed" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}