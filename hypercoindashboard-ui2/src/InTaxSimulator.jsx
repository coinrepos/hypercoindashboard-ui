import React, { useState } from "react";

export default function InTaxSimulator() {
  const [spend, setSpend] = useState("");
  const [tax, setTax] = useState(null);

  const simulate = () => {
    const parsed = parseFloat(spend);
    if (!parsed) return setTax("Enter valid amount");
    const result = parsed * 0.0275;
    setTax(result.toFixed(2));
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded">
      <h3 className="text-xl font-semibold mb-4">InTax Simulator</h3>
      <input
        type="number"
        placeholder="Spend amount"
        value={spend}
        onChange={(e) => setSpend(e.target.value)}
        className="p-2
