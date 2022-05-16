import React, { FC, useState, useContext } from 'react';
import { SectionReadyContextValueType } from './types';

const initValue = {
  isReady: false,
  setIsReady: () => {},
};

const SectionReadyContext = React.createContext<SectionReadyContextValueType>(initValue);

export const useIsSectionReady = () => {
  return useContext(SectionReadyContext);
};

export const SectionReadyProvider: FC = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  console.log('SectionReadyProvider isReady', isReady);

  return (
    <SectionReadyContext.Provider
      value={{
        isReady,
        setIsReady,
      }}
    >
      {children}
    </SectionReadyContext.Provider>
  );
};
