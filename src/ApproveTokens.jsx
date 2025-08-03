// ApproveTokens.jsx
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function ApproveTokens() {
  const [token, setToken] = useState("");
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("1000");

  async function approveManually() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const abi = ["function approve(address spender, uint256 amount) public returns (bool)"];
      const contract = new ethers.Contract(token, abi, signer);
      const tx = await contract.approve(spender, ethers.parseEther(amount));
      await tx.wait();
      toast.success("Approved manually!");
    } catch (err) {
      toast.error("Manual approval failed: " + err.message);
    }
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manual Token Approver</h2>

      <input
        placeholder="Token Address"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <input
        placeholder="Spender Address"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <input
        placeholder="Amount (in ETH units)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 border"
      />

      <button
        onClick={approveManually}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Approve
      </button>
    </div>
  );
}
