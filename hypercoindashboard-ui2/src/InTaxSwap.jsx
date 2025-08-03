import React, { useState } from "react";

export default function InTaxSwap() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSwap = async () => {
    setStatus("🔄 Processing KREDS swap...");
    try {
      const res = await fetch("http://localhost:3001/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const json = await res.json();
      setStatus(`✅ Swapped for ${json.kreds} KREDS`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Swap failed.");
    }
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded">
      <h3 className="text-xl font-bold mb-4">InTax ➝ KREDS Swap</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 rounded text-black mr-2"
      />
      <button onClick={handleSwap} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
        🔁 Swap
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
}
