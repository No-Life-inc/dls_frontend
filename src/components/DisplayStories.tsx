import React, { useState, useEffect } from 'react'
import { Story } from '../types/types'
import { GETALLSTORIES } from "../graphql/queries";
import {useQuery} from '@apollo/client';

/***
 * This component displays a list of stories.
 */
const DisplayStories = () =>{
    const { loading, error, data } = useQuery(GETALLSTORIES);
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
      if (data) {
        setStories(data.getAllStories);
      }
    }, [data]);

    if (loading) return <p>"Loading..."</p>;
    if (error) return <p>Error : {error.message}</p>; 

  return (
    <div>
    <div>Display Stories Component</div>
                <ul>
                {stories.map((story: Story) => (
    <li key={story._id}>
        {story.storyInfo?.bodyText} - {story.storyInfo?.imgUrl}
    </li>
))}
                </ul>
                </div>
  )
}

DisplayStories.propTypes = {}

export default DisplayStories
