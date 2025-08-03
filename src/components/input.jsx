// components/ui/input.jsx
import React from "react";

export function Input({ id, type = "text", value, onChange, placeholder = "", className = "" }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
