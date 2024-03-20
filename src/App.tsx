import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from "./pages/Frontpage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from './pages/AboutPage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GRAPHQLURL, // use the GRAPHQLURL environment variable
  cache: new InMemoryCache()
});

/**
 * Main component of the application.
 * Renders the Frontpage component wrapped in ApolloProvider for GraphQL support.
 * @returns JSX element representing the entire application
 */

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/profile"
            element={<ProfilePage isLoggedIn={isLoggedIn} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};
export default App;
