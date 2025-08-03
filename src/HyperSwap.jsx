import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FaExchangeAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KREDSLogoNeonSpin from "./KREDSLogoNeonSpin";
import SovrynSwapABI from "./abi/SovrynSwapABI.json";
import RouterDropdown from "./RouterDropdown";

// Default to Sovryn
const DEFAULT_ROUTER = "0x98fd891e3A223fa90AdC3EAB6B2e8B50c4A4Df41";
const WRBTC = "0x967f8799aF07DF1534d48A95a5C9FEBE92c53ae0";
const RUSDT = "0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96";
const RDAI = "0x6B1a73d547F4009A26B8485b63D7015D248AD406";

export default function HyperSwap() {
  const [account, setAccount] = useState(null);
  const [routerAddr, setRouterAddr] = useState(DEFAULT_ROUTER);
  const [swapContract, setSwapContract] = useState(null);
  const [amountIn, setAmountIn] = useState("");
  const [tokenOut, setTokenOut] = useState(RUSDT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum && routerAddr) {
      (async () => {
        const p = new ethers.BrowserProvider(window.ethereum);
        const signer = await p.getSigner();
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = new ethers.Contract(routerAddr, SovrynSwapABI, signer);
        setAccount(accounts[0]);
        setSwapContract(contract);
      })();
    }
  }, [routerAddr]);

  async function handleSwap() {
    if (!swapContract || !amountIn || !tokenOut) return;
    try {
      setLoading(true);
      const minReturn = 1;
      const tx = await swapContract.swapEtherToToken(tokenOut, minReturn, {
        value: ethers.parseEther(amountIn),
      });
      await tx.wait();
      toast.success("Swap completed");
    } catch (err) {
      toast.error("Swap failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white flex flex-col items-center">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">HyperSwap — RSK DEX</h1>
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        {/* Router Dropdown for Admin/DAO */}
        <RouterDropdown router={routerAddr} setRouter={setRouterAddr} />
        <label>Amount in WRBTC</label>
        <input
          type="text"
          className="w-full p-2 mb-4 rounded text-black"
          placeholder="e.g., 0.001"
          value={amountIn}
          onChange={e => setAmountIn(e.target.value)}
        />
        <label>Output Token</label>
        <select
          className="w-full p-2 mb-4 rounded text-black"
          value={tokenOut}
          onChange={e => setTokenOut(e.target.value)}
        >
          <option value={RUSDT}>rUSDT</option>
          <option value={RDAI}>rDAI</option>
        </select>
        <button
          onClick={handleSwap}
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded flex center gap-2"
          disabled={loading}
        >
          {loading ? <KREDSLogoNeonSpin size={22} duration={1.2} /> : <FaExchangeAlt />} Swap
        </button>
      </div>
    </div>
  );
}
