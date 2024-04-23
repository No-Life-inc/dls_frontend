import React, { useState, useEffect } from "react";
import { Story } from "../types/types";
import { GETALLSTORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import CreateComment from "./CreateComment";

/***
 * This component displays a list of stories.
 */
const DisplayStories = () => {
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useContext(AuthContext);
  const [stories, setStories] = useState<Story[]>([]);
  const [commentFormVisibility, setCommentFormVisibility] = useState<boolean[]>([]);

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
      setCommentFormVisibility(new Array(data.getAllStories.length).fill(false)); // Add this line
    }
  }, [data, error]);

  const toggleCommentForm = (index: number) => { // Add this function
    const newCommentFormVisibility = [...commentFormVisibility];
    newCommentFormVisibility[index] = !newCommentFormVisibility[index];
    setCommentFormVisibility(newCommentFormVisibility);
  };

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
          {stories.map((story: Story, index: number) => (
              <li key={story.storyInfo.title}>
                {story.storyInfo.bodyText} - {story.storyInfo.imgUrl}
                <button onClick={() => toggleCommentForm(index)}>Add Comment</button>
                {commentFormVisibility[index] && <CreateComment storyGuid={story.storyInfo.title}  />}
              </li>
          ))}
        </ul>
      </div>
  );
};


DisplayStories.propTypes = {};

export default DisplayStories;
