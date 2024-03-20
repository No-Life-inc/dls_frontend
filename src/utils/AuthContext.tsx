import React, { createContext, useState } from "react";

interface AuthContextState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

interface AuthContextProps {
    children: React.ReactNode;
  }

const initialAuthContextState: AuthContextState = {
  isLoggedIn: false,
  setLoggedIn: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialAuthContextState);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};