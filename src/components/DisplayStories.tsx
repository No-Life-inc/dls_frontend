import React, { useState, useEffect } from "react";
import { Story } from "../types/types";
import { GETALLSTORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

/***
 * This component displays a list of stories.
 */
const DisplayStories = () => {
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useContext(AuthContext);
  const [stories, setStories] = useState<Story[]>([]);

  const { loading, error, data } = useQuery(GETALLSTORIES, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token, // Skip the query if there's no token
  });

  useEffect(() => {
    if (data) {
      setStories(data.getAllStories);
    }
  }, [data, error]);

  if (!isLoggedIn || !token) {
    return <p>You must be logged in to view stories.</p>;
  }

  if (loading) {
    return <p>"Loading..."</p>;
  }

  if (error) {
    localStorage.removeItem("token");
    return <p>Error : {error.message}</p>;
  }

  return (
    <div>
      <div>Display Stories Component</div>
      <ul>
        {stories.map((story: Story) => (
          <li key={story.storyInfo.title}>
            {story.storyInfo.bodyText} - {story.storyInfo.imgUrl}
          </li>
        ))}
      </ul>
    </div>
  );
};


DisplayStories.propTypes = {};

export default DisplayStories;
