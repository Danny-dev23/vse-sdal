import React, { createContext, useState, useContext } from "react";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
