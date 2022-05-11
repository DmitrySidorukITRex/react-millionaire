import React, { createContext, useEffect, useState } from 'react';
import { getUsersRating } from './rating.service';

export const UsersContext = createContext({
  usersRating: [],
  getUsersRating: () => undefined,
});

export const UsersProvider = ({ children }) => {
  const [usersRating, setUsersRating] = useState([]);

  useEffect(() => {
    getUsersRatingFromApi();
  }, []);

  const getUsersRatingFromApi = () => {
    setUsersRating([]);
    getUsersRating()
      .then((usersRating) => setUsersRating(usersRating))
      .catch((error) => console.log(error));
  };

  const contextValue = {
    usersRating,
    getUsersRating: getUsersRatingFromApi,
  };

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};
