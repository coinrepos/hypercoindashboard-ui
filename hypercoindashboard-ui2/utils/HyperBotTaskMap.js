// utils/HyperBotTaskMap.js

const taskMap = {
  onMintSuccess: (to, amount) => {
    console.log(`✅ Minted ${amount} tokens to ${to}`);
    // Add custom logic like tracking mint events or queuing actions
  },

  onStakeSuccess: (amount) => {
    console.log(`📥 Staked ${amount} tokens.`);
    // Add stake analytics, trigger DAO contribution check, etc.
  },

  onProposalCreated: (data) => {
    console.log(`🗳️ New DAO Proposal Submitted: ${data}`);
    // Link to discussion, evaluate voting priority, etc.
  },

  // Optionally expand with more triggers
  onError: (context, err) => {
    console.error(`❌ Error during ${context}:`, err);
  },
  onDexPoolCreated: (tokenA, tokenB) => {
  console.log(`🌊 DEX liquidity pool created: ${tokenA}/${tokenB}`);
  // Trigger liquidity tracking or notify DAO
},

onLiquidityAdded: (amountA, amountB) => {
  console.log(`💧 Added liquidity: ${amountA} / ${amountB}`);
  // Log to dashboard or emit event for rewards
},

onLiquidityDrained: (token, level) => {
  console.warn(`🚨 Low liquidity for ${token}: ${level}%`);
  // Trigger auto-hedge or smart routing logic
},

};

export default taskMap;
