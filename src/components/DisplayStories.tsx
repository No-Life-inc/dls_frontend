import React, { useState, useEffect, useContext } from "react";
import { Story } from "../types/types";
import { GETALLSTORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../utils/AuthContext";
import EditStory from "./EditStory";
import EditComment from "./EditComment";
import CreateComment from "./CreateComment";
import { deleteStory } from '../api/apiFunctions';
import { deleteComment } from '../api/apiFunctions'; 

const DisplayStories = () => {
    const { user } = useContext(AuthContext);
    const { token, isLoggedIn } = useContext(AuthContext); 

    const cdnUrl = process.env.REACT_APP_CDNURL;

    const { loading, error, data } = useQuery(GETALLSTORIES, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    const [stories, setStories] = useState<Story[]>([]);
    const [editingStory, setEditingStory] = useState<Story | null>(null);
    const [commentFormVisibility, setCommentFormVisibility] = useState<boolean[]>([]);
    const [editCommentFormVisibility, setEditCommentFormVisibility] = useState<boolean[][]>([]); // New state

    useEffect(() => {
        if (data) {
            setStories(data.getAllStories);
            setCommentFormVisibility(new Array(data.getAllStories.length).fill(false));
            setEditCommentFormVisibility(new Array(data.getAllStories.length).fill([])); // Initialize with empty arrays
        }
    }, [data, error]);

    const toggleCommentForm = (index: number) => {
        const newCommentFormVisibility = [...commentFormVisibility];
        newCommentFormVisibility[index] = !newCommentFormVisibility[index];
        setCommentFormVisibility(newCommentFormVisibility);
    };

    const toggleEditCommentForm = (storyIndex: number, commentIndex: number) => { // New function
        const newEditCommentFormVisibility = [...editCommentFormVisibility];
        const storyEditCommentFormVisibility = [...newEditCommentFormVisibility[storyIndex]];
        storyEditCommentFormVisibility[commentIndex] = !storyEditCommentFormVisibility[commentIndex];
        newEditCommentFormVisibility[storyIndex] = storyEditCommentFormVisibility;
        setEditCommentFormVisibility(newEditCommentFormVisibility);
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

    const handleDelete = async (storyGuid: string) => {
        try {
          await deleteStory(storyGuid, token);
          setStories(stories.filter(story => story.storyGuid !== storyGuid));
        } catch (error) {
          console.error('Failed to delete story:', error);
        }
    };

    const handleDeleteComment = async (commentGuid: string) => {
      try {
        await deleteComment(commentGuid, token);
        setStories(stories.map(story => ({
          ...story,
          comments: story.comments.filter(comment => comment.commentGuid !== commentGuid)
        })));
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    };
      
    return (
      <div>
        <div>Display Stories Component</div>
        <ul>
          {stories.map((story: Story, storyIndex: number) => (
            <li key={story.storyInfo.title}>
              {story.storyInfo.bodyText}
              <img src={`${cdnUrl}${story.storyInfo.imgUrl}`} alt={story.storyInfo.title} />
              <button onClick={() => toggleCommentForm(storyIndex)}>Add Comment</button>
              {story.user && user && story.user.userGuid === user.userGuid.toLocaleUpperCase() && (
                <button onClick={() => handleDelete(story.storyGuid)}>Delete Story</button>
              )}
              {commentFormVisibility[storyIndex] && <CreateComment {...story} />}
              <ul>
                {story.comments.map((comment, commentIndex) => {
                  return (
                    <li key={comment.commentGuid}>
                      {comment.commentInfo && comment.commentInfo.bodyText}
                      {comment.user && user && comment.user.userGuid === user.userGuid.toLocaleUpperCase() && (
                        <button onClick={() => handleDeleteComment(comment.commentGuid)}>Delete Comment</button>
                      )}
                      {comment.user && user && comment.user.userGuid === user.userGuid.toLocaleUpperCase() && (
                        <button onClick={() => toggleEditCommentForm(storyIndex, commentIndex)}>Edit Comment</button> // Toggle edit comment form visibility
                      )}
                      {editCommentFormVisibility[storyIndex] && editCommentFormVisibility[storyIndex][commentIndex] && (
                        <EditComment comment={comment} token={token} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        {editingStory && <EditStory story={editingStory} />}
      </div>
  );
};

export default DisplayStories;
