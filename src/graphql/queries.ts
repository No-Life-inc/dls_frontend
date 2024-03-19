import { gql } from '@apollo/client';

/***
 *  This query retrieves all stories from the database.
 */
export const GETALLSTORIES = gql`
  query {
    getAllStories {
      id
      title
      body_text
      img_url
    }
  }
`;