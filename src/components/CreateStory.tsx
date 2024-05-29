import React, { useContext, useState } from 'react';

import { AuthContext } from '../utils/AuthContext';
import { submitStory } from '../api/apiFunctions';

type CreateStoryProps = {
  storyGuid: string;
};

const CreateStory: React.FC<CreateStoryProps> = ({ storyGuid }) => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [storyCreated, setStoryCreated] = useState(false); // New state variable
  const { token } = useContext(AuthContext); 
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          fileType: fileType || ""
      };
      try {
        const data = await submitStory(newStory, token);
        console.log('Success:', data);
        setStoryCreated(true); // Set storyCreated to true when a story is successfully created
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
        Image:
        <input type="file" onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
            setFileType(e.target.files[0].type);
          }
        }} />
      </label>
      <input type="submit" value="Create Story" />
      {storyCreated && <p>Story created successfully!</p>} {/* Display a success message when a story is created */}
    </form>
  );
};

export default CreateStory;