import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SDSISModule from "./SDSISModule";
import abi from "./abi.json";

const contractAddress = "0xb83b08bd688739dcf499091B7596931c2DD8835F"; // Replace with actual

export default function GovDashboard() {
  const [isGov, setIsGov] = useState(false);
  const [wallet, setWallet] = useState("");
  const [localCurrency, setLocalCurrency] = useState("");
  const [tariffRate, setTariffRate] = useState("");
  const [sanctionedCoin, setSanctionedCoin] = useState("");
  const [embargoCountry, setEmbargoCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [status, setStatus] = useState("");
  const [sdsisActive, setSdsisActive] = useState(false);

  useEffect(() => {
    const checkGov = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setWallet(addr);

        const whitelistedGovs = [
          "0xb83b08bd688739dcf499091b7596931c2dd8835f", // Admin wallet
        ];
        if (whitelistedGovs.includes(addr.toLowerCase())) {
          setIsGov(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkGov();
  }, []);

  const handleMintCurrency = () => {
    setStatus(`✅ Sovereign currency '${localCurrency}' minted.`);
  };

  const handleTariff = () => {
    setStatus(`✅ Tariff of ${tariffRate}% applied.`);
  };

  const handleSanction = () => {
    setStatus(`⛔ Sanction applied to token '${sanctionedCoin}'.`);
  };

  const handleEmbargo = () => {
    const country = embargoCountry === "Other" ? customCountry : embargoCountry;
    if (!country) return setStatus("❌ Select or enter a country.");
    setStatus(`🚫 Embargo applied against ${country}.`);
  };

  const enterSDSIS = () => {
    setSdsisActive(true);
    setStatus("⚠️ Entered SDSIS. Sovereign assets locked. See debt module below.");
  };

  if (!isGov) {
    return (
      <div style={panelStyle}>
        <h2 style={titleStyle}>🏛️ Government Dashboard</h2>
        <p style={{ color: "#888" }}>Access denied. Not a verified government wallet.</p>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>🏛️ Government Dashboard</h2>

      {!sdsisActive && (
        <>
          {/* Mint */}
          <div>
            <h4>🪙 Mint National Currency</h4>
            <input style={inputStyle} placeholder="Currency Symbol (e.g. GOVX)"
              value={localCurrency}
              onChange={(e) => setLocalCurrency(e.target.value)}
            />
            <button onClick={handleMintCurrency} style={btnStyle}>Mint</button>
          </div>

          <hr style={hrStyle} />

          {/* Tariff */}
          <div>
            <h4>📊 Apply Tariff (%)</h4>
            <input style={inputStyle} type="number" placeholder="Tariff %" value={tariffRate}
              onChange={(e) => setTariffRate(e.target.value)}
            />
            <button onClick={handleTariff} style={btnStyle}>Apply</button>
          </div>

          <hr style={hrStyle} />

          {/* Sanction */}
          <div>
            <h4>⛔ Sanction Token</h4>
            <input style={inputStyle} placeholder="Token Symbol (e.g. BADCOIN)" value={sanctionedCoin}
              onChange={(e) => setSanctionedCoin(e.target.value)}
            />
            <button onClick={handleSanction} style={btnStyleRed}>Sanction</button>
          </div>

          <hr style={hrStyle} />

          {/* Embargo */}
          <div>
            <h4>🚫 Apply Embargo</h4>
            <label>Select Country:</label>
            <select style={inputStyle} onChange={(e) => setEmbargoCountry(e.target.value)} value={embargoCountry}>
              <option value="">-- Choose a Country --</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="China">🇨🇳 China</option>
              <option value="Russia">🇷🇺 Russia</option>
              <option value="Iran">🇮🇷 Iran</option>
              <option value="North Korea">🇰🇵 North Korea</option>
              <option value="Other">➕ Add Custom</option>
            </select>
            {embargoCountry === "Other" && (
              <input style={inputStyle} placeholder="Enter country name"
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
              />
            )}
            <button onClick={handleEmbargo} style={btnStyleRed}>Apply Embargo</button>
          </div>

          <hr style={hrStyle} />

          {/* SDSIS Entry */}
          <div>
            <h4>🏦 Enter SDSIS (Debt Pool)</h4>
            <button onClick={enterSDSIS} style={btnStyleOrange}>Enter SDSIS</button>
          </div>

          <hr style={hrStyle} />

          {/* InTax Burn */}
          <div>
            <h4>🔥 InTax Dissolve (Non-Holdable)</h4>
            <p style={{ color: "#f87171" }}>
              ⚠️ All received InTax is auto-dissolved and routed to debt payoff. Govs cannot hold InTax.
            </p>
            <p><strong>Total InTax Dissolved:</strong> 128,442 INX</p>
            <p><strong>Debt Burn Contribution:</strong> 12.3%</p>
            <p><strong>DAO Collector:</strong> <code>0x23F8...Ab91</code></p>
          </div>
        </>
      )}

      {status && <p style={{ marginTop: "1rem", color: "#4ade80" }}>{status}</p>}

      {/* SDSIS LIVE MODULE */}
      {sdsisActive && (
        <>
          <hr style={hrStyle} />
          <SDSISModule govWallet={wallet} />
        </>
      )}
    </div>
  );
}

// --- Styling ---
const panelStyle = {
  backgroundColor: "#1a1a1a",
  padding: "2rem",
  borderRadius: "10px",
  color: "#fff",
  marginTop: "2rem",
};

const titleStyle = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  width: "100%",
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #444",
  marginBottom: "1rem",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  padding: "10px 16px",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "10px",
};

const btnStyleRed = {
  ...btnStyle,
  backgroundColor: "#dc2626",
};

const btnStyleOrange = {
  ...btnStyle,
  backgroundColor: "#f97316",
};

const hrStyle = {
  borderColor: "#333",
  margin: "1.5rem 0",
};
