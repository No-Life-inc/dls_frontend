import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [userGuid, setUserGuid] = useState('');


const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storyGuid = uuidv4();

    // Create a new story object
    const newStory = {
      story_guid: storyGuid,
      title,
      body_text: bodyText,
      img_url: imgUrl,
      user_guid: userGuid,
    };

    // Send a POST request to the REST API
    fetch('http://localhost:3000/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStory),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Body Text:
        <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
      </label>
      <label>
        User GUID:
        <input type="text" value={userGuid} onChange={(e) => setUserGuid(e.target.value)} />
      </label>
      <input type="submit" value="Create Story" />
    </form>
  );
};

export default CreateStory;