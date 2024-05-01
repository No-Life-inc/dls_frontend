import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from './pages/AboutPage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider, AuthContext } from './utils/AuthContext';


// console.log(process.env.REACT_APP_GRAPHQLURL);

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQLURL, // use the GRAPHQLURL environment variable
  cache: new InMemoryCache()
});

/**
 * Main component of the application.
 * Renders the Frontpage component wrapped in ApolloProvider for GraphQL support.
 * @returns JSX element representing the entire application
 */

const App: React.FC = () => {
  const { setUser, setToken } = useContext(AuthContext); // Get setUser from context

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // Remove user data on logout
    setToken(null); // Remove token on logout
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<Frontpage />} />
            <Route
              path="/profile"
              element={<ProfilePage isLoggedIn={isLoggedIn} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};
export default App;
