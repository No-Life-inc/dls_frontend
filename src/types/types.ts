/**
 * Represents a story object with its properties.
 */
export type StoryInfo = {
  title: string;
  bodyText: string;
  imgUrl: string;
};

export type Story = {
  _id: string;
  storyInfo: StoryInfo;
};
