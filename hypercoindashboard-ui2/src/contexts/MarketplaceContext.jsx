// src/contexts/MarketplaceContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../abi/HyperCoinEcosystem.json";

const contractAddress = "0x15e95b29561D7FFA365E6053E3a42C1d1CDf0d40";

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        try {
          const _provider = new ethers.BrowserProvider(window.ethereum);
          await _provider.send("eth_requestAccounts", []);

          const _signer = await _provider.getSigner();
          const _account = await _signer.getAddress();
          const _contract = new ethers.Contract(contractAddress, ABI, _signer);

          setAccount(_account);
          setProvider(_provider);
          setSigner(_signer);
          setContract(_contract);
        } catch (err) {
          console.error("🔌 Wallet connection error:", err);
        }
      } else {
        console.warn("🦊 MetaMask not detected.");
      }
    };

    initWallet();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{ account, provider, signer, contract }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => useContext(MarketplaceContext);
