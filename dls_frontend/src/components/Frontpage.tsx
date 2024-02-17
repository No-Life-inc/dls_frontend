import React, { Component } from 'react';
import { Story } from "../types/types";
import { getAllStories } from "../graphql/queries";

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
            const stories: Story[] = await getAllStories()
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
                        <li key={story.title}>{story.bodyText} - {story.imageUrl}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Frontpage;
