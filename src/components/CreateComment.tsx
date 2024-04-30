import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Story} from "../types/types";

const CreateComment = (story: Story) => {
    const [bodyText, setBodyText] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const commentGuid = uuidv4();

        const newComment = {
            commentGuid: commentGuid,
            commentInfo: {
                bodyText: bodyText,
            },
            story: {
                storyGuid: story.storyGuid
            }
        }
        console.log(newComment)
        fetch(`http://localhost:3000/v1/comments`, {
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

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Comment Text:
                <textarea value={bodyText} onChange={e => setBodyText(e.target.value)}/>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}


export default CreateComment;