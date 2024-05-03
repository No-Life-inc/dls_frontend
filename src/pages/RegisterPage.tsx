import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    guid: uuidv4(), // Generating a unique GUID
  });

  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_AUTHURL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setRegistrationComplete(true);
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        guid: uuidv4(),
      });

      console.log("User registered successfully");
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div>
      {registrationComplete ? (
        <div>
          <h2>Registration successful!</h2>
          {/* Additional elements or redirection can be added here */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterComponent;
