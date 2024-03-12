import React, { Component } from "react";
import DisplayStories from "../components/DisplayStories";
import CreateStory from "../components/CreateStory";

class Frontpage extends Component {
  render() {
    return (
      <div>
        <DisplayStories />
        <CreateStory />
      </div>
    );
  }
}

export default Frontpage;
