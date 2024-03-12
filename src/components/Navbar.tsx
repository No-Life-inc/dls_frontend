import React from "react";
import "../styles/navbar.css";
import {Link} from "react-router-dom"

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const handleLogin = () => {
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleRegister = () => {
    // Redirect to register page
    window.location.href = "/register";
  };

  return (
    <nav>
      <div className="navbar-left">
        <Link className="home" to="/">
          Home
        </Link>
        <Link className="about" to="/about">
          About
        </Link>
        {isLoggedIn && <Link to="/profile">Profile</Link>}
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <div className="login-container">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;