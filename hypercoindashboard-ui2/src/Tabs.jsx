// src/Tabs.jsx

import * as React from "react";

export function Tabs({ defaultValue, className, children }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value: triggerValue, children, value, setValue }) {
  const isActive = value === triggerValue;
  return (
    <button
      className={`px-4 py-2 rounded ${isActive ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
      onClick={() => setValue(triggerValue)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value: contentValue, children, value }) {
  if (value !== contentValue) return null;
  return <div className="mt-4">{children}</div>;
}
