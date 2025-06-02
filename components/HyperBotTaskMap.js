// components/HyperBotTaskMap.js

export async function executeTask(taskName, payload = {}) {
  switch (taskName) {
    case "EXECUTE_DAO_LOGIC":
    case "CHECK_MESH_VALIDATORS":
      try {
        const res = await fetch('/api/hyperbot/task', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: taskName, payload })// components/HyperBotTaskMap.js (simplified integration)
export const HyperBotTaskMap = {
  autoMint: async (wallet) => {
    await fetch('/api/mint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: wallet, amount: "1.0" })
    });
  },
  autoStake: async (wallet) => {
    await fetch('/api/stake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: wallet, amount: "1.0" })
    });
  },
  autoProposal: async (description) => {
    await fetch('/api/daoProposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
  }
},
        });
        const data = await res.json();
        console.log("✅ HyperBot executed:", data);
      } catch (error) {
        console.error("❌ HyperBot error:", error);
      }
      break;

    default:
      console.warn(`⚠️ Unknown HyperBot task: ${taskName}`);
  }
}
