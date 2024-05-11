import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../utils/AuthContext';
import { submitStory } from '../api/apiFunctions';
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
  const [image, setImage] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null); // New state variable for file type
  const { token } = useContext(AuthContext); 

/***
 *  This function is called when the form is submitted. It sends a POST request to the REST API to create a new story.
 */
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storyGuid = uuidv4();

    if (!image) {
      alert('Please select an image');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async function() {
      const base64Image = reader.result?.toString() || '';

      const newStory = {
        storyGuid: storyGuid,
        createdAt: new Date().toISOString(),
        storyInfo: {
            title: title,
            bodyText: bodyText,
          },
          image: base64Image,
          fileType: fileType || "" // Add the file type to the new story object
      };
      try {
        const data = await submitStory(newStory, token);
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
        Image:
        <input type="file" onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
            setFileType(e.target.files[0].type); // Save the file type
          }
        }} />
      </label>
      <input type="submit" value="Create Story" />
    </form>
  );
};
export default CreateStory; // Add this closing curly brace
