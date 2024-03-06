import React, { Component } from 'react';
import { Story } from "../types/types";
import DisplayStories from './DisplayStories';


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
