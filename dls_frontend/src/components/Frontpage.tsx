import React, { Component } from 'react';
import { Story } from "../types/types";

interface State {
    stories: Story[];
}

class Frontpage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stories: [],
        };
    }

    componentDidMount() {
        this.fetchStories();
    }

    fetchStories = async () => {
        try {
            const response = await fetch('http://localhost:3001/stories');
            const stories: Story[] = await response.json();
            this.setState({ stories });
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        }
    }

    render() {
        const { stories } = this.state;
        return (
            <div>
                <h1>Hi</h1>
                <ul>
                    {stories.map(story => (
                        <li key={story.title}>{story.text} - {story.imageUrls}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Frontpage;
