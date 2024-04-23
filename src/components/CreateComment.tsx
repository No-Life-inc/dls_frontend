import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const CreateComment = (storyGuid: any) => {
    const [commentText, setCommentText] = useState("")
    const [userGuid, setUserGuid] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const commentGuid = uuidv4();

        const newComment = {
            comment_guid: commentGuid,
            comment_text: commentText,
            user_guid: userGuid,
            story_guid: storyGuid
        }
        fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Comment Text:
                <textarea value={commentText} onChange={e => setCommentText(e.target.value)} />
            </label>
            <label>
                User GUID:
                <input type="text" value={userGuid} onChange={e => setUserGuid(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}


export default CreateComment;