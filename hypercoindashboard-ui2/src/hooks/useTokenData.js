// ✅ src/hooks/useTokenData.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useTokenData(contract, account) {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      if (!contract || !account) return;

      const raw = await contract.balanceOf(account);
      const formatted = ethers.utils.formatUnits(raw, 18); // ✅ FIXED!
      setBalance(formatted);
    };

    fetchData();
  }, [contract, account]);

  return balance;
}
