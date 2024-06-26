import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";


const AboutPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  // Check if authContext is defined, otherwise provide a default value
  //const isLoggedIn = authContext?.isLoggedIn ?? false;
  
    return (
        <div>
          <h2>About us</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

    );
  };
  
  export default AboutPage;