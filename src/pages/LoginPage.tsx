import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { apiRequest } from "../api/apiFunctions";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await apiRequest("auth","/login", "POST", { email, password });

      const token = data.token;
      const user = data.user; // Assuming the user data is returned in the 'user' field
      console.log("JWT token:", token);

      // Store the token temporarily
      localStorage.setItem("token", token);

      setUser(user); // Save user data in context

      console.log("Login successful");
      setLoggedIn(true);
      onLogin();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
