import { useState } from "react";
import { useTheme } from "./ThemeContext";

export default function OnboardingPortal({ onStart }) {
  const [role, setRole] = useState("User");
  const [agreed, setAgreed] = useState(false);
  const [ipfsEnabled, setIpfsEnabled] = useState(false);
  const [validatorInfo, setValidatorInfo] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const enter = () => {
    if (!agreed) return alert("You must accept the terms to proceed.");
    if (onStart) onStart({ role, ipfsEnabled, validatorInfo });
  };

  return (
    <div style={portalStyle(theme)}>
      <h1 style={{ marginBottom: "1rem" }}>🌐 Welcome to HyperOS</h1>
      <p style={descStyle(theme)}>Select your role and enter the decentralized economic system of the future.</p>

      <div style={inputBlock}>
        <label>Your Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle(theme)}>
          <option>User</option>
          <option>Government</option>
          <option>DAO Delegate</option>
        </select>
      </div>

      <div style={inputBlock}>
        <label><input type="checkbox" checked={ipfsEnabled} onChange={() => setIpfsEnabled(!ipfsEnabled)} /> Enable IPFS Hibernated Modules</label>
      </div>

      <div style={inputBlock}>
        <label><input type="checkbox" checked={validatorInfo} onChange={() => setValidatorInfo(!validatorInfo)} /> Acknowledge Validator Revenue Model</label>
      </div>

      <div style={inputBlock}>
        <label><input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} /> I accept terms of use and legal disclaimer.</label>
      </div>

      <button onClick={enter} style={btnStyle}>🚀 Enter HyperDashboard</button>
      <button onClick={toggleTheme} style={toggleBtn}>
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

// 🔧 Dynamic Theming Styles
const portalStyle = (theme) => ({
  backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc",
  color: theme === "dark" ? "#fff" : "#000",
  padding: "3rem",
  borderRadius: "10px",
  maxWidth: "500px",
  margin: "3rem auto",
  textAlign: "center",
});

const descStyle = (theme) => ({
  color: theme === "dark" ? "#ccc" : "#333",
  marginBottom: "2rem",
});

const inputBlock = {
  marginBottom: "1.25rem",
  textAlign: "left",
};

const inputStyle = (theme) => ({
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
  color: theme === "dark" ? "#fff" : "#000",
  border: "1px solid #334155",
});

const btnStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  marginTop: "1rem",
  cursor: "pointer",
};

const toggleBtn = {
  backgroundColor: "#4b5563",
  color: "#fff",
  padding: "8px 16px",
  fontSize: "0.9rem",
  border: "none",
  borderRadius: "6px",
  marginTop: "1rem",
  marginLeft: "1rem",
  cursor: "pointer",
};
