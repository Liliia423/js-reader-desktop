import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Tab = {
  id: string;
  title: string;
  file: File | null;
};

type TabContextType = {
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  setActiveTab: (id: string) => void;
  activeTabId: string | null;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const addTab = (tab: Tab) => {
    const exists = tabs.find((t) => t.id === tab.id);
    if (!exists) {
      setTabs((prev) => [...prev, tab]);
    }
    setActiveTabId(tab.id);
  };

  return (
    <TabContext.Provider
      value={{ tabs, addTab, activeTabId, setActiveTab: setActiveTabId }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used inside a <TabProvider>");
  }
  return context;
};
