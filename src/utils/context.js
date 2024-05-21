import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const updateUser = value => {
    setUser(value);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
