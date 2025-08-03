// File: src/hooks/useBalance.js
import { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils";

export default function useBalance(provider, contract, account) {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!provider || !contract || !account) return;

    const fetchBalance = async () => {
      try {
        const rawBalance = await contract.balanceOf(account);
        const formatted = formatUnits(rawBalance, 18);
        setBalance(formatted);
      } catch (error) {
        console.error("Failed to fetch balance", error);
      }
    };

    fetchBalance();
  }, [provider, contract, account]);

  return balance;
}
