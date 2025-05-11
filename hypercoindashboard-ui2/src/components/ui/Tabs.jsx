import React, { useState } from "react";

export function Tabs({ children, defaultValue, className }) {
  const [value, setValue] = useState(defaultValue);
  return <div className={className}>{React.Children.map(children, child => 
    React.cloneElement(child, { value, setValue }))}</div>;
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value: tabValue, setValue, value, children }) {
  return (
    <button onClick={() => setValue(tabValue)}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
