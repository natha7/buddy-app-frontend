import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(1);
  
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
