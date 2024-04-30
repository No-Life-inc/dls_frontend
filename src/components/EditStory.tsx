import React, { useState } from 'react';
import { Story } from '../types/types';
import { updateStory } from '../api/apiFunctions';

interface EditStoryProps {
    story: Story;
  }
  
  const EditStory: React.FC<EditStoryProps> = ({ story }) => {
    const [bodyText, setBodyText] = useState(story.storyInfo?.bodyText || '');
    const [imgUrl, setImgUrl] = useState(story.storyInfo?.imgUrl || '');
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        await updateStory(story.storyGuid, bodyText, imgUrl); // use the function
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Body Text:
          <input type="text" value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </label>
        <button type="submit">Update Story</button>
      </form>
    );
  };
  
  export default EditStory;