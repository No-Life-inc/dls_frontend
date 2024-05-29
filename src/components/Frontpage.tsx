import React, { Component } from 'react';
import { Story } from "../types/types";
import DisplayStories from './DisplayStories';
import CreateStory from './CreateStory';

/***
 * Interface for the state of the Frontpage component.
 */
interface State {
    stories: Story[];
}
/***
 * Constructor for the Frontpage component.
 * @param props The properties passed to this component.
 */
class Frontpage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stories: [],
        };
    }

/***
 * Render method for the Frontpage component.
 * Displays the main page of the application. Displays stories and a form to create a new story.
 */
    render() {
        return (
            <div>
                <h1>Hi</h1>
                <DisplayStories/>
            </div>
        );
    }
}

export default Frontpage;
