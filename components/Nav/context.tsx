import React, { FC, useState, useContext } from 'react';
import { NavNodeBaseType, NavContextType } from './types';

const initContextValue: NavContextType = {
  navItems: [],
  setNavItems: () => {},
};

const NavContext = React.createContext<NavContextType>(initContextValue);

export const useNavContext = () => {
  return useContext(NavContext);
};

export const NavProvider: FC = ({ children }) => {
  const [navItems, setNavItems] = useState<NavNodeBaseType[]>([]);

  return (
    <NavContext.Provider
      value={{
        navItems,
        setNavItems,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
