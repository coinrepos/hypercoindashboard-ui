// components/ui/tabs.jsx
import React, { useState } from "react";

export function Tabs({ tabs = [], onChange }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mb-4">
      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => {
              setActive(idx);
              if (onChange) onChange(idx);
            }}
            className={`px-4 py-2 text-sm font-medium ${
              active === idx
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
