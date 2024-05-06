import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../utils/AuthContext';
//import { config } from 'dotenv';

//config();

//const REST_API_URL = process.env.RESTAPIURL;

/***
 * This component allows users to create a new story.
 * It contains a form with input fields for the story title, body text, image URL, and user GUID.
 */
const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [userGuid, setUserGuid] = useState('');
  const { token } = useContext(AuthContext); 

/***
 *  This function is called when the form is submitted. It sends a POST request to the REST API to create a new story.
 */
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const storyGuid = uuidv4();

    // Create a new story object
    const newStory = {
      storyGuid: storyGuid,
      createdAt: new Date().toISOString(),
      user: {
        userGuid: userGuid,
      },
      storyInfo: {
        title: title,
        bodyText: bodyText,
        imgUrl: imgUrl,
      }
    }
    fetch(`http://localhost:3000/v1/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

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

  /***
   *  This function returns a form that allows users to create a new story.
   */
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