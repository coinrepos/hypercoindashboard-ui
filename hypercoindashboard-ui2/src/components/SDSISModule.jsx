import { useState } from "react";

export default function SDSISModule({ govWallet }) {
  const [inSDSIS, setInSDSIS] = useState(false);
  const [monthsRemaining, setMonthsRemaining] = useState(24); // 2-year schedule
  const [debtAmount, setDebtAmount] = useState(500000); // Example
  const [repaid, setRepaid] = useState(0);
  const [isAtWar, setIsAtWar] = useState(false);
  const [status, setStatus] = useState("");

  const enterSDSIS = () => {
    setInSDSIS(true);
    setStatus("⚠️ Entered SDSIS. Sovereign assets locked.");
  };

  const toggleWar = () => {
    setIsAtWar(!isAtWar);
    setStatus(isAtWar ? "🕊️ Peace resumed. Loan cap reset." : "⚔️ Wartime Clause active. Borrowing restricted.");
  };

  const simulateRepayment = () => {
    const monthlyPayment = 50000;
    const repayment = repaid + monthlyPayment;

    if (repayment >= debtAmount) {
      setRepaid(debtAmount);
      setInSDSIS(false);
      setStatus("✅ SDSIS complete. Assets unlocked.");
    } else {
      setRepaid(repayment);
      setMonthsRemaining(monthsRemaining - 1);
      setStatus(`💸 Paid ${monthlyPayment}. Remaining: $${debtAmount - repayment}`);
    }
  };

  const failAndTransferToDAO = () => {
    setStatus("❌ SDSIS defaulted. Assets absorbed by DAO for public use.");
    setInSDSIS(false);
  };

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>🏦 SDSIS – Sovereign Debt Management</h3>

      {!inSDSIS ? (
        <button onClick={enterSDSIS} style={btnStyleGreen}>Enter SDSIS</button>
      ) : (
        <>
          <p><strong>Wallet:</strong> {govWallet}</p>
          <p><strong>Debt Total:</strong> ${debtAmount.toLocaleString()}</p>
          <p><strong>Repaid:</strong> ${repaid.toLocaleString()}</p>
          <p><strong>Months Left:</strong> {monthsRemaining}</p>
          <p><strong>Status:</strong> {status}</p>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={simulateRepayment} style={btnStyleBlue}>Simulate Monthly Payment</button>
            <button onClick={toggleWar} style={btnStyleOrange}>
              {isAtWar ? "🕊️ End Wartime Clause" : "⚔️ Trigger Wartime Clause"}
            </button>
            <button onClick={failAndTransferToDAO} style={btnStyleRed}>Force Default (Transfer to DAO)</button>
          </div>
        </>
      )}
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
  fontSize: "1.4rem",
  marginBottom: "1rem",
};

const btnStyleGreen = {
  backgroundColor: "#22c55e",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnStyleBlue = {
  ...btnStyleGreen,
  backgroundColor: "#3b82f6",
  marginRight: "10px",
};

const btnStyleOrange = {
  ...btnStyleGreen,
  backgroundColor: "#f97316",
  marginRight: "10px",
};

const btnStyleRed = {
  ...btnStyleGreen,
  backgroundColor: "#dc2626",
};
