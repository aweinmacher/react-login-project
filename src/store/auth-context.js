import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {}, // for autocomplete only
  onLogout: () => {}, // for autocomplete only
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
    // empty dependancies array => only on mount
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
