"use client";
import { createContext } from "react";

export const ManagedUI = createContext(undefined);

export function ManagedUIProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ManagedUI.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ManagedUI.Provider>
  );
}
