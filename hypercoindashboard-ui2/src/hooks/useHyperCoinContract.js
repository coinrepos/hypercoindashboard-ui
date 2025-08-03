// src/hooks/useHyperCoinContract.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abi/KitCoin.json"; // Make sure ABI is correct

const contractAddress = "0xYourContractAddressHere"; // 🛑 Replace this

export function useHyperCoin() {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const rpc = process.env.REACT_APP_INFURA_URL;
      if (!rpc) return console.error("❌ INFURA URL not set");

      const _provider = new ethers.providers.JsonRpcProvider(rpc);
      const _contract = new ethers.Contract(contractAddress, abi, _provider);

      setProvider(_provider);
      setContract(_contract);
    };

    setup();
  }, []);

  return { provider, contract };
}
