import { ethers } from "ethers";

export const taskMap = {
  addLiquidity: async (payload, contract) => {
    const { amount, recipient } = payload;
    const tx = await contract.mint(recipient, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    console.log("✅ Liquidity minted");
  },

  daoVote: async (payload, contract) => {
    console.log("🗳 DAO vote triggered with payload:", payload);
    // Insert governance contract call logic here
  },

  burn: async (payload, contract) => {
    const { amount } = payload;
    const tx = await contract.burn(ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    console.log("🔥 Tokens burned");
  },

  proposeGovernanceChange: async (payload, contract) => {
    console.log("📜 Governance proposal submitted:", payload.description);
    // Add actual proposal logic here if supported by the contract
  },

  transferTokens: async (payload, contract) => {
    const { to, amount } = payload;
    const tx = await contract.transfer(to, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    console.log(`💸 Transferred ${amount} tokens to ${to}`);
  }
};
