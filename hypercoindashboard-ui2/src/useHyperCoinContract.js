// src/useHyperCoinContract.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "./abi/wrappedHyperCoinABI.json";

const contractAddress = "0x15e95b29561D7FFA365E6053E3a42C1d1CDf0d40";

export default function useHyperCoinContract() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const instance = new ethers.Contract(contractAddress, ABI, signer);
        setContract(instance);
      }
    };

    init();
  }, []);

  return contract;
}
