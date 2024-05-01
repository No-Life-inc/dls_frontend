import React, {useState, useEffect, useContext} from "react";
import {Story} from "../types/types";
import {GETALLSTORIES} from "../graphql/queries";
import {useQuery} from "@apollo/client";
import {AuthContext} from "../utils/AuthContext";
import EditStory from './EditStory';
import CreateComment from "./CreateComment";

/***
 * This component displays a list of stories.
 */
const DisplayStories = () => {
    const { token, isLoggedIn } = useContext(AuthContext); 

    const {loading, error, data} = useQuery(GETALLSTORIES, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    const [stories, setStories] = useState<Story[]>([]);
    const [editingStory, setEditingStory] = useState<Story | null>(null);
    const [commentFormVisibility, setCommentFormVisibility] = useState<boolean[]>([]);

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
        return <p>Error : {error.message}</p>;
    }

    const handleEdit = (story: Story) => {
        setEditingStory(story);
    };

    return (
      <div>
        <div>Display Stories Component</div>
        <ul>
          {stories.map((story: Story, index: number) => (
              <li key={story.storyInfo.title}>
                {story.storyInfo.bodyText} - {story.storyInfo.imgUrl}
                <button onClick={() => toggleCommentForm(index)}>Add Comment</button>
                {commentFormVisibility[index] && <CreateComment {...story}  />}
              </li>
          ))}
        </ul>
          {editingStory && <EditStory story={editingStory}/>}
      </div>
  );
};


DisplayStories.propTypes = {};

export default DisplayStories;
