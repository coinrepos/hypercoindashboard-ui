import { useState } from "react";

export default function CommonsVault() {
  const [vaultAssets] = useState([]);

  return (
    <div>
      <h2>🌐 Commons Vault</h2>
      <p>This will hold DAO-curated public assets and government-backed liquidity.</p>
      <ul>
        {vaultAssets.length === 0 ? (
          <li>No assets in vault yet.</li>
        ) : (
          vaultAssets.map((a, i) => <li key={i}>{a.name}</li>)
        )}
      </ul>
    </div>
  );
}
