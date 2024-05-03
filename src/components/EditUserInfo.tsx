import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { apiRequest } from "../api/apiFunctions";
import { HttpMethod } from "../types/types";

interface EditUserInfoProps {
    setIsEditing: (isEditing: boolean) => void; // Add setIsEditing prop
  }

  const EditUserInfo: React.FC<EditUserInfoProps> = ({ setIsEditing }) => {

  const { user, setUser, token } = useContext(AuthContext); // Get user and setUser from context

  const [firstName, setFirstName] = useState(user?.firstName? user?.firstName : '');
  const [lastName, setLastName] = useState(user?.lastName? user?.lastName : '');
  const [email, setEmail] = useState(user?.email? user.email : '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.userGuid) { // Check if userGuid is not undefined
      apiRequest("auth", `/update/${user.userGuid}`, HttpMethod.PUT, { firstName, lastName, email }, token)
      setUser({ ...user, firstName, lastName, email }); // Update user data in context
      setIsEditing(false);
    } else {
      console.error("userGuid is undefined");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <form onSubmit={handleSubmit}>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setIsEditing(false)}>Cancel</button> {/* Add Cancel button */}
    </form>
    </form>
  );
};

export default EditUserInfo;