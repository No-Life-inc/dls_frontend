import React, { useState, useEffect, useContext } from "react";
import { Story } from "../types/types";
import { GETALLSTORIES } from "../graphql/queries";
import { AuthContext } from "../utils/AuthContext";
import {useQuery} from '@apollo/client';
import EditStory from './EditStory';


/***
 * This component displays a list of stories.
 */


const DisplayStories = () =>{
    const token = localStorage.getItem("token");
    const { loading, error, data } = useQuery(GETALLSTORIES, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
    const { isLoggedIn } = useContext(AuthContext);
    const [stories, setStories] = useState<Story[]>([]);
    const [editingStory, setEditingStory] = useState<Story | null>(null);
    
    useEffect(() => {
      if (data) {
        setStories(data.getAllStories);
      }
    }, [data]);

    if (!isLoggedIn || !token) {
      return <p>You must be logged in to view stories.</p>;
    }
    
    if (loading) return <p>"Loading..."</p>;
    if (error) return <p>Error : {error.message}</p>; 

    const handleEdit = (story: Story) => {
      setEditingStory(story);
    };

  return (
    <div>
    <div>Display Stories Component</div>
                <ul>
                {stories.map((story: Story) => (
    <li key={story._id}>
        {story.storyInfo?.bodyText} - {story.storyInfo?.imgUrl}
        <button onClick={() => handleEdit(story)}>Edit</button>
    </li>
    ))}
    </ul>
    {editingStory && <EditStory story={editingStory}/>}
    </div>
  )
}


DisplayStories.propTypes = {};

export default DisplayStories;
