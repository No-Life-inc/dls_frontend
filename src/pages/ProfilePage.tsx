import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import EditUserInfo from "../components/EditUserInfo";

interface ProfilePageProps {
  isLoggedIn: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isLoggedIn }) => {
  const { setLoggedIn, token } = useContext(AuthContext);
  console.log("Token:", token);
  const [userData, setUserData] = useState<{ id: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Add isEditing state

  useEffect(() => {
    if (isLoggedIn && token) {
      setUserData({ id: token });
    }
  }, [isLoggedIn, token, setUserData, setLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <div>
          <h2>Profile Page</h2>
          {userData ? (
            <div>
              <p>User ID: {userData.id}</p>
              <button onClick={() => setIsEditing(true)}>Edit User Info</button> {/* Add Edit User Info button */}
              {isEditing && <EditUserInfo setIsEditing={setIsEditing} />} {/* Show EditUserInfo component when isEditing is true */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <div>
          <h2>You need to login to see this page</h2>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfilePage;