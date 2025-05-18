import { ethers } from "ethers";
import abi from "@/abi/wrappedHyperCoinABI.json";

const CONTRACT_ADDRESS = "0xb83b08bd688739dcf499091B7596931c2DD8835F"; // ✅ Use real deployed address

let provider, signer, contract;

export async function initWrappedHyperCoin() {
  if (typeof window.ethereum === "undefined") throw new Error("MetaMask is not available");
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  return contract;
}

export async function getBalance(address) {
  if (!contract) await initWrappedHyperCoin();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
}

export async function mintTokens(to, amount) {
  if (!contract) await initWrappedHyperCoin();
  const tx = await contract.mint(to, ethers.utils.parseEther(amount));
  return await tx.wait();
}

export async function burnTokens(amount) {
  if (!contract) await initWrappedHyperCoin();
  const tx = await contract.burn(ethers.utils.parseEther(amount));
  return await tx.wait();
}
