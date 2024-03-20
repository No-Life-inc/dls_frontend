import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";

interface ProfilePageProps {
  isLoggedIn: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isLoggedIn }) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const { setLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState<{
    id: string;
  } | null>(null);

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
