import React, { useContext, useState } from 'react';
import { Story } from '../types/types';
import { updateStory } from '../api/apiFunctions';
import { AuthContext } from '../utils/AuthContext';

interface EditStoryProps {
  story: Story;
}

const EditStory: React.FC<EditStoryProps> = ({ story }) => {
  const [bodyText, setBodyText] = useState(story.storyInfo?.bodyText || '');
  const [image, setImage] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null); // New state variable for file type
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

      const updatedStory = {
        storyInfo: {
          bodyText: bodyText,
        },
        image: base64Image,
        fileType: fileType || "" // Add the file type to the updated story object
      };
      try {
        const data = await updateStory(story.storyGuid, updatedStory, token);
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value="Update Story" />
    </form>
  );
};

export default EditStory;