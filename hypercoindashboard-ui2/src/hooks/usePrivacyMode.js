import { createContext, useContext, useState } from "react";

const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const togglePrivacy = () => setIsPrivate(prev => !prev);
  return (
    <PrivacyContext.Provider value={{ isPrivate, togglePrivacy }}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacyMode = () => useContext(PrivacyContext);
