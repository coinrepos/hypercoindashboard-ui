import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletSelector({ onSelect }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setAccounts(accounts);
        } catch (err) {
          console.error("Account fetch error", err);
        }
      }
    }
    fetchAccounts();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">Select Wallet</label>
      <select
        className="w-full border rounded px-2 py-1"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose Wallet --</option>
        {accounts.map((addr) => (
          <option key={addr} value={addr}>{addr}</option>
        ))}
      </select>
    </div>
  );
}