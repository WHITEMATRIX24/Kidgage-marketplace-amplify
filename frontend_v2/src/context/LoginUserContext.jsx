import React, { createContext, useState } from "react";

export const userDataContext = createContext({});

function LoginUserContext({children}) {
  const [userData, setUserData] = useState(false);
  return (
    <userDataContext.Provider
      value={{ userData, setUserData}}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default LoginUserContext;
