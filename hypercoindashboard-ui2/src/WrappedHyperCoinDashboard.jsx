// src/WrappedHyperCoinDashboard.jsx

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import {
  HYPERCOIN_CONTRACT,
  APP_NAME,
  TOKEN_SYMBOL,
  IS_ADMIN
} from "./config.js";

// ✅ Corrected paths for components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/Tabs";
import { Card, CardContent } from "./components/ui/Card";

import HyperBurn from "./HyperBurn.jsx";
import InTaxSwap from "./InTaxSwap.jsx";
import TreasuryControls from "./TreasuryControls.jsx";
import DAOVoting from "./DAOVoting.jsx";
import GlobalToggle from "./GlobalToggle.jsx";
import LiveFeedPanel from "./LiveFeedPanel.jsx";
import StockCoinMintForm from "./StockCoinMintForm.jsx";
import HyperSwap from "./HyperSwap.jsx";
import BridgeUI from "./BridgeUI.jsx";
import GoPrivateButton from "./components/GoPrivateButton.jsx";
import HyperBotAdminPanel from "./HyperBotAdminPanel.jsx";
import BurnUnlockZone from "./components/BurnUnlockZone.jsx";

export default function WrappedHyperCoinDashboard() {
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [status, setStatus] = useState("🦊 Please connect your MetaMask.");
  const [rbtcBalance, setRBTCBalance] = useState(null);
  const [hypeBalance, setHypeBalance] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setWallet(window.ethereum);
    } else {
      setStatus("❌ MetaMask not detected.");
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!wallet) return setStatus("❌ No wallet detected.");
      const accounts = await wallet.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setUserAddress(address);
      setStatus(`✅ Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);

      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(address);
      setRBTCBalance(ethers.formatEther(balance));

      const hype = new ethers.Contract(HYPERCOIN_CONTRACT, abi, signer);
      const hypeBal = await hype.balanceOf(address);
      setHypeBalance(ethers.formatUnits(hypeBal, 18));
    } catch (err) {
      console.error("❌ Wallet connect error:", err);
      setStatus("❌ Wallet connection failed.");
    }
  };

  return (
    <div className="p-4 text-white bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🌐 {APP_NAME} Dashboard</h1>

      <GoPrivateButton />
      <button
        onClick={connectWallet}
        className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded mb-4 font-bold"
      >
        {userAddress ? "Wallet Connected" : "Connect Wallet"}
      </button>
      <p className="mb-6">{status}</p>

      {userAddress && (
        <Tabs defaultValue="dao" className="space-y-4">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="dao">🗳 DAO</TabsTrigger>
            <TabsTrigger value="bridge">🌉 Bridge</TabsTrigger>
            <TabsTrigger value="mint">🧬 Mint</TabsTrigger>
            <TabsTrigger value="swap">🔁 Swap</TabsTrigger>
            <TabsTrigger value="burn">🔥 Burn</TabsTrigger>
            <TabsTrigger value="live">📡 Live Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="dao">
            <DAOVoting />
          </TabsContent>
          <TabsContent value="bridge">
            <BridgeUI />
          </TabsContent>
          <TabsContent value="mint">
            <StockCoinMintForm />
          </TabsContent>
          <TabsContent value="swap">
            <HyperSwap />
          </TabsContent>
          <TabsContent value="burn">
            <HyperBurn />
            <BurnUnlockZone />
          </TabsContent>
          <TabsContent value="live">
            <LiveFeedPanel />
          </TabsContent>
        </Tabs>
      )}

      {IS_ADMIN && (
        <>
          <TreasuryControls />
          <GlobalToggle isAdmin={IS_ADMIN} />
          <HyperBotAdminPanel />
        </>
      )}
    </div>
  );
}
