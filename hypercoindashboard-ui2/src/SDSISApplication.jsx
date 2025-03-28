import { useState } from "react";

export default function SDSISApplication() {
  const [form, setForm] = useState({
    country: "",
    wallet: "",
    amount: "",
    reason: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitApplication = () => {
    if (!form.country || !form.wallet || !form.amount || !form.reason) {
      return setStatus("❌ All fields are required.");
    }

    // Simulated DAO submission
    setStatus(`📤 Application submitted for ${form.country}. Awaiting DAO validator review...`);
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>📨 Apply for SDSIS Assistance</h2>
      <p style={descStyle}>
        Submit a sovereign request to enter the HyperCoin SDSIS liquidity debt pool.
        Applications are reviewed by the DAO Validator Network.
      </p>

      <input style={inputStyle} name="country" placeholder="Country Name" value={form.country} onChange={handleChange} />
      <input style={inputStyle} name="wallet" placeholder="National Wallet Address" value={form.wallet} onChange={handleChange} />
      <input style={inputStyle} name="amount" placeholder="Debt Amount (USD)" value={form.amount} onChange={handleChange} />
      <textarea
        style={inputStyle}
        name="reason"
        rows={4}
        placeholder="Justification for SDSIS application..."
        value={form.reason}
        onChange={handleChange}
      ></textarea>

      <button onClick={submitApplication} style={btnStyle}>Submit Application</button>

      {status && <p style={statusStyle}>{status}</p>}
    </div>
  );
}

const panelStyle = {
  backgroundColor: "#111",
  padding: "2rem",
  borderRadius: "10px",
  color: "#fff",
  marginTop: "2rem",
};

const titleStyle = {
  fontSize: "1.5rem",
};

const descStyle = {
  margin: "1rem 0",
  color: "#aaa",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "1rem",
  border: "1px solid #333",
  backgroundColor: "#1f1f1f",
  color: "#fff",
};

const btnStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const statusStyle = {
  marginTop: "1rem",
  color: "#4ade80",
};
