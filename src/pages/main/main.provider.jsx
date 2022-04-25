import React, { createContext, useEffect, useState } from 'react';
import { getRounds } from './main.service';

export const MainContext = createContext({
  rounds: [],
  getRounds: () => undefined,
});

export const MainProvider = ({ children }) => {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    getRoundsFromApi();
  }, []);

  const getRoundsFromApi = () => {
    setRounds([]);
    getRounds()
      .then((rounds) => setRounds(rounds))
      .catch((error) => console.log(error));
  };

  const contextValue = {
    rounds,
    getRounds: getRoundsFromApi,
  };

  return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>;
};

// export const useRounds = () => {
//   const store = useContext(MainContext);
//   return store;
// };
