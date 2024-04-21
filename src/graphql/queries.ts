import { gql } from '@apollo/client';

/***
 *  This query retrieves all stories from the database.
 */
export const GETALLSTORIES = gql`
query GetAllStories {
  getAllStories {
    _id
    storyInfo {
      bodyText
      imgUrl
      title
    }
  }
}
`;