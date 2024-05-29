import React, { useContext, useState } from 'react';
import { Story } from '../types/types';
import { updateStory } from '../api/apiFunctions';
import { AuthContext } from '../utils/AuthContext';
import { time, timeStamp } from 'console';

interface EditStoryProps {
  story: Story;
}

const EditStory: React.FC<EditStoryProps> = ({ story }) => {
  const [title, setTitle] = useState(story.storyInfo?.title || '')
  const [bodyText, setBodyText] = useState(story.storyInfo?.bodyText || '');
  const [image, setImage] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null); // New state variable for file type
  const { token } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted');
    event.preventDefault();
  
    let base64Image = '';
    let updatedFileType = '';
  
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      await new Promise((resolve) => {
        reader.onloadend = function() {
          base64Image = reader.result?.toString() || '';
          resolve(null);
        };
      });
      updatedFileType = image.type;
    }
  
    const updatedStory = {
      storyInfo: {
        title: title,
        bodyText: bodyText,
        createdAt: new Date().toISOString()
      },
      image: base64Image,
      fileType: updatedFileType
    };

    console.log('Submitting the following data:', updatedStory);

    try {
      const data = await updateStory(story.storyGuid, updatedStory, token);
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> {/* New input field for title */}
      </label>
      <label>
        Body Text:
        <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="file" onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setImage(e.target.files[0]);
          setFileType(e.target.files[0].type); // Save the file type
        } else {
          setImage(null);
          setFileType(null);
        }
      }} />
      </label>
      <input type="submit" value="Update Story" />
    </form>
  );
};

export default EditStory;