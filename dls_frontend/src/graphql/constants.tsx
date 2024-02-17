import { gql } from "graphql-request";
//create our query
const getAllStoriesQuery = gql`
  query {
    getAllStories { #run the getAllStories command
      id
      title
      bodyText
      imgUrl
    }
  }
`;

export { getAllStoriesQuery as getAllStoriesQuery};