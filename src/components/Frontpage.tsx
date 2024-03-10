import React, { Component } from "react";
import DisplayStories from "./DisplayStories";
import CreateStory from "./CreateStory";

class Frontpage extends Component {
  render() {
    return (
      <div>
        <br/>
        <br/>
        <DisplayStories />
        <CreateStory />
      </div>
    );
  }
}

export default Frontpage;
