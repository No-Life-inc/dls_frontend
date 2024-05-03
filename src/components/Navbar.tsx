import React from "react";
import { useContext } from "react";
import "../styles/navbar.css";
import {Link} from "react-router-dom"
import { AuthContext } from "../utils/AuthContext";
/**
 * Props interface for Navbar component
 */
interface NavbarProps {
  isLoggedIn: boolean; // Indicates wether a user is logged in or not
  onLogout: () => void; // Callback function to handle logout event
}

/**
 * Functional component representing the navigation bar
 * @param {NavbarProps} param Props for the Navbar component 
 * @returns TSX element representing the navigation bar
 */
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const { user } = useContext(AuthContext); // Get user from context

  const handleLogin = () => {
    /**
     * Redirects the user to the login page
     */
    window.location.href = "/login";
  };

  /**
   * Redirects the user to the register page
   */
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
        {isLoggedIn && (
          <>
            <Link to="/profile">{user?.firstName} {user?.lastName}</Link>
            <span></span> {/* Display user's first name and last name */}
          </>
        )}
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