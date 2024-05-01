import React, { createContext, useState } from "react";
import { User } from "../types/types";

interface AuthContextState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  user: User | null; // Add user state
  setUser: (user: User | null) => void; // Add setUser function
  
}

interface AuthContextProps {
    children: React.ReactNode;
  }

  const initialAuthContextState: AuthContextState = {
    isLoggedIn: false,
    setLoggedIn: () => {},
    user: null, // Initialize user state
    setUser: () => {}, // Initialize setUser function
  };

  export const AuthContext = createContext<AuthContextState>(initialAuthContextState);

  export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null); // Add user state
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
};