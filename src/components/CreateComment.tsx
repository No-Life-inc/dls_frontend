import React, {useContext, useState} from 'react';
import {Story, HttpMethod} from "../types/types";
import { AuthContext } from '../utils/AuthContext';
import { submitComment } from '../api/apiFunctions';


const CreateComment = ({story, commentGuid}: {story: Story, commentGuid: string}) => {
    const [bodyText, setBodyText] = useState("");
    const { token } = useContext(AuthContext); 
    const [commentCreated, setCommentCreated] = useState(false); // New state variable


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const newComment = {
            commentGuid: commentGuid,
            commentInfo: {
                bodyText: bodyText,
            },
            story: {
                storyGuid: story.storyGuid
            },
        
        }

        try{
            const data = await submitComment(newComment, token);
            if(data)
                {
                    setCommentCreated(true); // Set commentCreated to true when a comment is successfully created
                }
        } catch (error) {
            console.error('Error:', error);
        }
        }
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Comment Text:
                    <textarea value={bodyText} onChange={e => setBodyText(e.target.value)}/>
                </label>
                <button type="submit">Submit</button>
                {commentCreated && <p>Comment created successfully!</p>} {/* Display a success message when a comment is created */}
            </form>
        )
}


export default CreateComment;