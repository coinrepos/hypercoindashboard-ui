// pages/api/deployDAO.js
import taskMap from '../../utils/HyperBotTaskMap';

try {
  const tx = await contract.deployDAO();
  const receipt = await tx.wait();
  taskMap.onGovernanceDeployed(receipt.contractAddress); // Trigger bot logic
  res.status(200).json({ tx_hash: receipt.transactionHash });
} catch (err) {
  taskMap.onError('deployDAO', err);
  res.status(500).json({ error: err.message });
}
