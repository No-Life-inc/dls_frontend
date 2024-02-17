import React from 'react'
import { Story } from '../types/types'

type Props = {
    stories: Story[],
}

const DisplayStories:React.FC<Props> = ({stories}): JSX.Element => {
  return (
    <div>
    <div>DisplayStories</div>
                <ul>
                    {stories.map(story => (
                        <li key={story.title}>{story.bodyText} - {story.imageUrl}</li>
                    ))}
                </ul>
                </div>
  )
}

DisplayStories.propTypes = {}

export default DisplayStories
