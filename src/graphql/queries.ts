import { gql } from '@apollo/client';

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