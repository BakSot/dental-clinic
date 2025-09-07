import { createContext, useContext, useState, type ReactNode } from "react";

type UIContextType = {
  selectedPatientId: number | null;
  setSelectedPatientId: (id: number | null) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  return (
    <UIContext.Provider value={{ selectedPatientId, setSelectedPatientId }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
};